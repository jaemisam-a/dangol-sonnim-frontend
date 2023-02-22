import React from "react";

import Layout from "common/layout";
import Tab from "customer/my/Tab";
import Profile from "customer/my/Profile";

const My = () => {
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
