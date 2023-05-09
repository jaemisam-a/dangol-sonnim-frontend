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
import { CreateStoreResDataType, getMyStore } from "pages/api/owner/dangolStore";
import { categoryIdToString } from "src/utils/category";
import useCurrentStore from "src/store/currentStore";

const bottomPadding = css`
  height: 2rem;
`;

const Settings = () => {
  const menuDummyData = [
    { id: 1, name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: 2, name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: 3, name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: 4, name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
    { id: 5, name: "불고기비빔밥", img: "/images/dummy/cheetah.jpg", price: 9500 },
  ];

  const subsDummyData = [
    {
      id: 1,
      name: "모든 메뉴 사이즈업",
      count: 5,
      description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
      price: 3500,
      isMain: true,
      tags: ["사이드디쉬추가", "사이즈업"],
      storeName: "정갈한솥",
    },

    {
      id: 2,
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
  const { data, isLoading } = useQuery("getMyStore", getMyStore, {
    // FIXME: 로그인 여부 확인하여 enable 상태 변경하도록 수정하기
    enabled: true,
  });
  const { currentStoreId, setCurrentStoreId } = useStore(useCurrentStore);

  const [storeData, setStoreData] = useState<CreateStoreResDataType>();

  useEffect(() => {
    //FIXME: 로그인 안된 상태라면 로그인 페이지로 이동
    if (!localStorage.getItem("accessToken")) {
      push("/owner/login");
    }
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      /** 등록한 가게가 있으면 기본적으로 가게 목록 중 첫번째가 보이도록 함 */
      setStoreData(data[0]);
      setCurrentStoreId(data[0].id);
    } else if (data?.length < 1) {
      /** 등록한 가게가 없는 경우에는 가게 정보 등록 페이지로 이동 */
      push("/owner/mystore");
    }
  }, [data]);

  useEffect(() => {
    /** 사이드 네비바에서 설정한 가게 변경할 경우 */
    if (data) {
      const currentStore = data.find((el: CreateStoreResDataType) => el.id === currentStoreId);
      if (currentStore) {
        setStoreData(currentStore);
      }
    }
  }, [currentStoreId, data]);

  /** 등록한 가게가 없어서 storeData가 빈 값인 경우에도 /mystore로 이동하는 동안에는 로딩을 렌더링한다. */
  if (isLoading || !storeData) return <Loading />;

  return (
    <Layout title="가게설정" subTitle="가게 설정" isLogo={true}>
      <Picture />
      <Info
        name={storeData?.name}
        category={categoryIdToString(storeData?.categoryType)}
        description={storeData?.comments}
      />
      <Location
        address={storeData?.newAddress}
        detail={storeData?.detailedAddress}
        openHour={storeData?.businessHours}
      />
      <Menus data={menuDummyData} />
      <Subs data={subsDummyData} />
      <div css={bottomPadding} />
    </Layout>
  );
};

export default Settings;
