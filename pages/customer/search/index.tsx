import React, { useEffect, useState } from "react";

import Layout from "common/layout";
import SearchInput from "customer/search/SearchInput";
import SearchList from "customer/search/SearchList";
import useLoginStore from "src/store/login";

const SUGGESTED_QUERIES = ["사이드 디쉬", "카페", "사이즈업", "한식", "할인"];
const RECENT_QUERIES = ["사이드 디쉬", "파스타", "김밥"];

const Search = () => {
  const { isLogin } = useLoginStore();

  // TODO: 로그인 상태 확인, 로그인 된 상태라면 최근 검색어 데이터 받아오기
  const [queries, setQueries] = useState(SUGGESTED_QUERIES);

  useEffect(() => {
    if (isLogin) {
      setQueries(RECENT_QUERIES);
    } else {
      setQueries(SUGGESTED_QUERIES);
    }
  }, [isLogin]);

  return (
    <Layout title="검색창" isNoHeader={true}>
      <SearchInput />
      <SearchList isLoggedIn={isLogin} queries={queries} />
    </Layout>
  );
};

export default Search;
