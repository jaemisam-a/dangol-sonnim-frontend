import React from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import StoreThumbnailList from "common/storeThumbnail/List";
import Location from "customer/main/Location";
import Sort from "customer/main/Sort";
import Category from "customer/main/Category";
import SearchBar from "customer/main/SearchBar";

const MOCK_STORE = [
  {
    id: "1",
    store: "더본즈피자",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 가리봉동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "2",
    store: "인버거",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "3",
    store: "인버거",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "4",
    store: "인버거",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "5",
    store: "인버거",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "6",
    store: "인버거",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "7",
    store: "인버거",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "8",
    store: "인버거",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
];

const searchBar = css`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
  padding: 0 1.25rem;
`;

const location = css`
  margin-bottom: 1rem;
  padding: 0 1.25rem;
`;

const category = css`
  padding: 0 1.25rem;
`;

const sort = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 0.875rem;
  padding: 0 1.25rem;
`;

const Customer = () => {
  return (
    <Layout title="단골손님">
      <div css={searchBar}>
        <SearchBar />
      </div>
      <div css={location}>
        <Location />
      </div>
      <div css={category}>
        <Category />
      </div>
      <section css={sort}>
        <Sort />
      </section>
      <StoreThumbnailList contents={MOCK_STORE} />
    </Layout>
  );
};

export default Customer;
