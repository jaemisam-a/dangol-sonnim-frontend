import React from "react";

import Layout from "common/layout";
import SearchInput from "customer/search/searchInput";
import SearchList from "customer/search/searchList";

const QUERIES = ["냉면", "초밥", "김밥", "감자탕"];

const Search = () => {
  return (
    <Layout title="검색" isNoHeader={true}>
      <SearchInput />
      <SearchList queries={QUERIES} />
    </Layout>
  );
};

export default Search;
