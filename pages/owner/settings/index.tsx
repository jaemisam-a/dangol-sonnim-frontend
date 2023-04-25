import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useStore } from "zustand";

import Layout from "common/layout";
import Loading from "common/loading";
import Picture from "owner/settings/picture";
import Location from "owner/settings/location";
import Menus from "owner/settings/menus";
import Subs from "owner/settings/subs";
import Info from "owner/settings/info";
import { DangolStoreDataType, getMyStore } from "pages/api/owner/dangolStore";
import { categoryIdToString } from "src/utils/category";
import useCurrentStore from "src/store/currentStore";

const bottomPadding = css`
  height: 2rem;
`;

const Settings = () => {
  const menuDummyData = [
    { id: "1", name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: "2", name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: "3", name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: "4", name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: "5", name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
  ];

  const subsDummyData = [
    {
      id: "jghs!12314",
      name: "모든 메뉴 사이즈업",
      count: 5,
      description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
      price: 3500,
      isMain: true,
      tags: ["사이드디쉬추가", "사이즈업"],
      storeName: "정갈한솥",
    },

    {
      id: "jghs!4985",
      name: "계란 추가 or 새우튀김 제공",
      count: 5,
      description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
      price: 3500,
      isMain: false,
      tags: ["사이드디쉬추가", "사이즈업"],
      storeName: "정갈한솥",
    },
  ];

  const { push } = useRouter();
  const { data, isLoading, error } = useQuery("getMyStore", getMyStore);
  const { currentStoreId, setCurrentStoreId } = useStore(useCurrentStore);

  const [storeData, setStoreData] = useState(data[0]);

  /** 가게 설정 페이지 처음 접속 시에는 가게 목록 중 첫번째가 보이도록 함 */
  useEffect(() => {
    if (!data) {
      push("/owner/mystore");
    } else {
      setCurrentStoreId(data[0].id);
    }
  }, []);

  useEffect(() => {
    setStoreData(data?.filter((el: DangolStoreDataType) => el.id === currentStoreId)[0]);
  }, [currentStoreId]);

  if (isLoading) return <Loading />;
  if (error) return alert(error);

  return (
    <Layout title="가게설정" subTitle="가게 설정" isLogo={true}>
      <Picture />
      <Info
        name={storeData.name}
        category={categoryIdToString(storeData.categoryType)}
        description={storeData.comments}
      />
      <Location
        address={storeData.newAddress}
        detail={storeData.detailedAddress}
        openHour={storeData.businessHours}
      />
      <Menus data={menuDummyData} />
      <Subs data={subsDummyData} />
      <div css={bottomPadding} />
    </Layout>
  );
};

export default Settings;
