import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import { css } from "@emotion/react";

import { StoreData } from "pages/api/store";
import { Colors, Texts } from "styles/common";
import Layout from "common/layout";
import StoreThumbnailList from "common/storeThumbnail/List";
import Sort from "common/filter/Sort";
import Location from "common/filter/Location";
import ArrowLeft from "public/icons/ArrowLeft.svg";
import CloseCircle from "public/icons/CloseCircle.svg";

const headerWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${Colors.neutral30};
  padding: 0.5rem 0.75rem;
  height: 3.5rem;

  & button {
    background: transparent;
  }
`;

const arrowLeft = css`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
`;

const queryWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.5rem;

  input {
    border: none;
    outline: none;
    width: 100%;
    ${Texts.B3_15_R2}
  }
`;

const filterWrapper = css`
  color: #191919;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  padding: 0.938rem 1.25rem;
`;

const divider = css`
  background-color: ${Colors.neutral40};
  width: 1px;
  height: 0.75rem;
`;

const resultWrapper = css`
  padding: 0.75rem 1.25rem;
`;

const emptyResult = css`
  text-align: center;
  margin: 20rem 0;
  ${Texts.S3_18_M}
`;

const Stores = () => {
  /** TODO: 검색 기능 API */
  const { query, push } = useRouter();
  const { data: storeData, isLoading } = useQuery("StoreData", () =>
    axios.get("/api/store").then((res) =>
      res.data.map((item: StoreData) => {
        let newObj: { [key: string]: any } = {};
        newObj["id"] = item.id;
        newObj["store"] = item.name;
        newObj["category"] = item.category;
        newObj["tags"] = item.subs[0].tags;
        newObj["shortAddress"] = item.location.shortAddress;
        newObj["img"] = item.images[0].src;
        return newObj;
      })
    )
  );

  // FIXME: 로그인 시에만 유저 데이터 가져오기
  const { data: userPick } = useQuery("UserData", () =>
    axios.get("/api/user").then((res) => res.data[0].pick)
  );

  return (
    <Layout title={`${query.query} 검색`} isNoHeader>
      <header css={headerWrapper}>
        <button css={arrowLeft} onClick={() => push("/search")}>
          <ArrowLeft stroke={Colors.neutral70} />
        </button>
        <div css={queryWrapper}>
          <input type="text" value={query.query} onFocus={() => push("/search")} />
          <button onClick={() => push("/search")}>
            <CloseCircle width="1.5rem" height="1.5rem" />
          </button>
        </div>
      </header>
      <div css={filterWrapper}>
        <Location isSearchPage={true} />
        <div css={divider}></div>
        <Sort isSearchPage={true} />
      </div>
      <section css={resultWrapper}>
        {storeData ? (
          <StoreThumbnailList contents={storeData} userPick={userPick} isLoading={isLoading} />
        ) : (
          <div css={emptyResult}>
            <p>검색결과가 없습니다.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Stores;
