import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Layout from "common/layout";
import Sort from "common/filter/sort";
import StoreThumbnailList from "common/storeThumbnail/list";
import Location from "common/filter/location";
import ArrowLeft from "public/icons/direction/arrowLeft.svg";
import CloseCircle from "public/icons/close/closeCircle.svg";
import { GetStoreListType, getStoreList } from "pages/api/store";

const headerWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${Colors.neutral30};
  padding: 0.5rem 0.75rem;
  height: 3.5rem;
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

  button {
    height: 1.5rem;
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

const Stores = () => {
  const { query, push } = useRouter();

  const {
    data: storeData,
    isFetching: isLoading,
    refetch,
  } = useQuery(["storeList"], () => getStoreList(storeListParams), {
    enabled: false,
  });

  const [storeListParams, setStoreListParams] = useState<GetStoreListType>({
    sortBy: "likeNumber",
  });

  useEffect(() => {
    if (!query.query) return;
    setStoreListParams((prev) => ({ ...prev, kw: String(query.query) }));
  }, [query]);

  useEffect(() => {
    if (!storeListParams.kw) return;
    refetch();
  }, [storeListParams]);

  return (
    <Layout title={`${query.query} 검색`} isNoHeader>
      <header css={headerWrapper}>
        <button css={arrowLeft} onClick={() => push("/search")}>
          <ArrowLeft stroke={Colors.neutral70} />
        </button>
        <div css={queryWrapper}>
          <input type="text" defaultValue={query.query} onFocus={() => push("/search")} />
          <button onClick={() => push("/search")}>
            <CloseCircle width="1.5rem" height="1.5rem" />
          </button>
        </div>
      </header>
      <div css={filterWrapper}>
        <Location isSearchPage={true} setStoreListParams={setStoreListParams} />
        <div css={divider}></div>
        <Sort isSearchPage={true} setStoreListParams={setStoreListParams} />
      </div>
      <section css={resultWrapper}>
        <StoreThumbnailList contents={storeData} isLoading={isLoading} />
      </section>
    </Layout>
  );
};

export default Stores;
