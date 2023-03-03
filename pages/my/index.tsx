import React, { useEffect, useState } from "react";

import Layout from "common/layout";
import Tab from "common/Tab";
import Profile from "customer/my/Profile";
import TabContent from "customer/my/TabContent";

const My = () => {
  useEffect(() => {
    // TODO: 로그인 상태가 아니라면 로그인 페이지로 이동
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Layout title="마이페이지" subTitle="마이페이지">
        <Profile />
        <Tab
          tabs={["내가 구독한 쿠폰", "좋아요 가게"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        >
          <TabContent selectedTab={selectedTab} />
        </Tab>
      </Layout>
    </>
  );
};

export default My;
