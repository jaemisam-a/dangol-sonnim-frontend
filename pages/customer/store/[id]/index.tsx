import React from "react";

import Layout from "customer/components/common/layout";
import Subs from "customer/components/store/Subs";
import Menus from "customer/components/store/Menus";
import Location from "customer/components/store/Location";

const Store = () => {
  const storeName = "정갈한솥";
  const dummyLocation = {
    address: "서울 구로구 디지털로26길 111 지하 1층 002호",
    exitInfo: "서울대입구역 6번 출구에서 50m",
    openHour: "10시에 영업시작",
  };

  return (
    <>
      <Layout title="가게이름">
        <Location
          address={dummyLocation.address}
          exitInfo={dummyLocation.exitInfo}
          openHour={dummyLocation.openHour}
        />

        <Menus />
        <Subs storeName={storeName} />
      </Layout>
    </>
  );
};

export default Store;
