import React from "react";

import Layout from "customer/components/common/layout";
import Subs from "customer/components/store/Subs";
import Menus from "customer/components/store/Menus";
import Location from "customer/components/store/Location";
import Info from "customer/components/store/Info";

const Store = () => {
  const dummyLocation = {
    address: "서울 구로구 디지털로26길 111 지하 1층 002호",
    detail: "서울대입구역 6번 출구에서 50m",
    openHour: "10시에 영업시작",
  };

  const dummyStore = {
    storeName: "정갈한솥",
    category: "한식",
    images: [
      { src: "/images/dummy/cheetah.jpg", alt: "clxk" },
      { src: "/images/dummy/pizza.png", alt: "clxk" },
      { src: "/images/Logo.png", alt: "clxk" },
    ],
    description: "“오늘 뭐먹지?” 고민 무조건 오면 해결!",
    menu: "모든 메뉴 사이즈업(5회)-월 3,500원",
    isPick: true,
  };

  const pickStore = () => {
    // TODO: 찜하기 기능
  };

  return (
    <>
      <Layout title="가게이름">
        <Location
          address={dummyLocation.address}
          detail={dummyLocation.detail}
          openHour={dummyLocation.openHour}
        />
        <Info infoContent={dummyStore} onPick={pickStore} />
        <Menus />
        <Subs storeName={dummyStore.storeName} />
      </Layout>
    </>
  );
};

export default Store;
