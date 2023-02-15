import React, { useEffect, useState } from "react";

import Layout from "customer/components/common/layout";
import SearchInput from "customer/components/search/SearchInput";
import SearchList from "customer/components/search/SearchList";

const SUGGESTED_QUERIES = ["사이드 디쉬", "카페", "사이즈업", "한식", "할인"];
const RECENT_QUERIES = ["사이드 디쉬", "파스타", "김밥"];

const Search = () => {
  // TODO: 로그인 상태 확인, 로그인 된 상태라면 최근 검색어 데이터 받아오기

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [queries, setQueries] = useState(SUGGESTED_QUERIES);

  useEffect(() => {
    if (isLoggedIn) {
      setQueries(RECENT_QUERIES);
    } else {
      setQueries(SUGGESTED_QUERIES);
    }
  }, [isLoggedIn]);

  return (
    <Layout title="검색창" isNoHeader={true}>
      <SearchInput />
      <SearchList isLoggedIn={isLoggedIn} queries={queries} />
      <button onClick={() => setIsLoggedIn((prev) => !prev)}>로그인 상태 변경</button>
    </Layout>
  );
};

export default Search;
