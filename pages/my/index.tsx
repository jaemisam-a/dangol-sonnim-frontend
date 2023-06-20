import React, { useEffect, useState } from "react";

import Layout from "common/layout";
import Tab from "common/tab";
import Profile from "customer/my/profile";
import TabContent from "customer/my/tabContent";

const My = () => {
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
