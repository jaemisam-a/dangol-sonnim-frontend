import React, { useEffect } from "react";

import Layout from "common/layout";
import Tab from "customer/my/Tab";
import Profile from "customer/my/Profile";

const My = () => {
  useEffect(() => {
    // TODO: 로그인 상태가 아니라면 로그인 페이지로 이동
  }, []);

  return (
    <>
      <Layout title="마이페이지" subTitle="마이페이지">
        <Profile />
        <Tab />
      </Layout>
    </>
  );
};

export default My;
