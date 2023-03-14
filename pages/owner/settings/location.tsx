import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { css } from "@emotion/react";

import Layout from "common/layout";
import SearchBar from "common/input/Search";
import LocationList, { checkedAddrType } from "common/LocationList";
import Spinner from "common/spinner";
import { Colors, Texts } from "styles/common";

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 1.25rem 0 1.25rem;
`;

const centerDiv = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30vh;
  color: ${Colors.neutral80};
  ${Texts.S3_18_M}
`;

const SettingsLocation = () => {
  const [ref, inView] = useInView();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [checkedAddr, setCheckedAddr] = useState<checkedAddrType>({ roadAddr: "" });

  const { data, isFetching, refetch, fetchNextPage } = useInfiniteQuery(
    "location",
    ({ pageParam = 1 }) =>
      axios
        .post(
          "/juso/addrlink/addrLinkApiJsonp.do",
          {
            confmKey: process.env.NEXT_PUBLIC_JUSO_VALIDATION_KEY,
            keyword: query,
            resultType: "json",
            countPerPage: 20,
            currentPage: pageParam,
          },
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => res),
    {
      getNextPageParam: (lastPage: any) =>
        Number(JSON.parse(lastPage.data.slice(1, -1)).results.common.currentPage) + 1,
      enabled: isSearching,
    }
  );

  const locationListData = data && JSON.parse(data?.pages.at(-1)?.data.slice(1, -1)).results;

  useEffect(() => {
    if (!data) return;
    const { countPerpage, totalCount, currentpage } = locationListData;
    /** 계속 fetch되는 것을 막기 위해 현재 페이지가 마지막 페이지라면 return */
    if (
      (totalCount % countPerpage ? totalCount / countPerpage + 1 : totalCount / countPerpage) ===
      currentpage
    )
      return;
    /** 마지막 ref가 보여지면 다음 페이지 fetch */
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <Layout title="가게 위치 등록" subTitle="위치 등록" isCheckButton={true}>
      <div css={wrapper}>
        <SearchBar
          isCustomer={false}
          placeholder="언주로 170"
          setState={setQuery}
          mutate={refetch}
          setIsSearching={setIsSearching}
        />
        <div>
          {isFetching ? (
            <div css={centerDiv}>
              <Spinner />
            </div>
          ) : (
            locationListData &&
            (locationListData.juso?.length ? (
              data?.pages.map((res: any) => {
                const locationData = JSON.parse(res.data.slice(1, -1)).results.juso;
                if (!locationData) return;
                return locationData.map((el: any, idx: number) => (
                  <LocationList
                    key={el.roadAddr}
                    idx={idx}
                    jibunAddr={el.jibunAddr}
                    roadAddr={el.roadAddr}
                    checkedAddr={checkedAddr}
                    setCheckedAddr={setCheckedAddr}
                    lastRef={ref}
                    dataLength={locationData.length}
                  />
                ));
              })
            ) : (
              <div css={centerDiv}>검색결과가 없습니다.</div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsLocation;
