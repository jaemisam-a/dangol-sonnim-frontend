import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { css } from "@emotion/react";
import { useStore } from "zustand";

import OwnerLayout from "common/layout/owner";
import SearchBar from "common/input/search";
import LocationList, { checkedAddrType } from "common/locationList";
import Spinner from "common/spinner";
import { Colors, Texts } from "styles/common";
import useMyStoreInfo from "src/store/storeInfo";

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

const bottomSpinner = css`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const SettingsLocation = () => {
  const { push, query: routerQuery } = useRouter();
  const [ref, inView] = useInView();
  const { setGlobalStoreInfo } = useStore(useMyStoreInfo);
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [checkedAddr, setCheckedAddr] = useState<checkedAddrType>({
    newAddress: "",
    sido: "",
    sigungu: "",
    bname1: "",
  });

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
    const { countPerPage, totalCount, currentPage } = locationListData.common;
    /** 계속 fetch되는 것을 막기 위해 현재 페이지가 마지막 페이지라면 return */
    const countPerPageNumber = parseInt(countPerPage);
    const totalCountNumber = parseInt(totalCount);
    const currentPageNumber = parseInt(currentPage);

    if (
      (totalCountNumber % countPerPageNumber
        ? Math.floor(totalCountNumber / countPerPageNumber) + 1
        : totalCountNumber / countPerPageNumber) === currentPageNumber ||
      totalCountNumber <= countPerPageNumber
    )
      return;
    /** 마지막 ref가 보여지면 다음 페이지 fetch */
    if (inView) {
      setIsSearching(true);
      fetchNextPage();
      setIsSearching(false);
    }
  }, [inView]);

  useEffect(() => {
    Object.keys(checkedAddr).forEach((key) =>
      setGlobalStoreInfo(key, checkedAddr[key as keyof checkedAddrType])
    );
  }, [checkedAddr]);

  return (
    <OwnerLayout
      title="가게 위치 등록"
      subTitle="위치 등록"
      checkBtnFnc={() =>
        push(
          {
            pathname: "/owner/mystore",
            query: { address: JSON.stringify(checkedAddr), isEdit: routerQuery.isEdit },
          },
          "/owner/mystore"
        )
      }
    >
      <div css={wrapper}>
        <SearchBar
          isCustomer={false}
          placeholder="언주로 170"
          setState={setQuery}
          mutate={refetch}
          setIsSearching={setIsSearching}
          query={query}
          setPreviousQuery={setPreviousQuery}
        />
        <div>
          {isFetching && (!locationListData || previousQuery !== query) ? (
            <div css={centerDiv}>
              <Spinner />
            </div>
          ) : (
            locationListData &&
            (locationListData.juso?.length ? (
              <>
                {data?.pages.map((res: any) => {
                  const locationData = JSON.parse(res.data.slice(1, -1)).results.juso;
                  if (!locationData) return;
                  return locationData.map((el: any, idx: number) => (
                    <LocationList
                      key={el.jibunAddr + el.roadAddr}
                      idx={idx}
                      jibunAddr={el.jibunAddr}
                      sido={el.siNm}
                      sigungu={el.sggNm}
                      bname1={el.emdNm}
                      newAddress={el.roadAddr}
                      checkedAddr={checkedAddr}
                      setCheckedAddr={setCheckedAddr}
                      lastRef={ref}
                      dataLength={locationData.length}
                    />
                  ));
                })}
                {isFetching && (
                  <div css={bottomSpinner}>
                    <Spinner />
                  </div>
                )}
              </>
            ) : (
              <div css={centerDiv}>검색결과가 없습니다.</div>
            ))
          )}
        </div>
      </div>
    </OwnerLayout>
  );
};

export default SettingsLocation;
