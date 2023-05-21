import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Layout from "common/layout";
import FullPageSpinner from "common/spinner/fullPage";
import Subs from "customer/store/subs";
import Menus from "customer/store/menu/menus";
import Location from "customer/store/location";
import Info from "customer/store/info";
import { Colors } from "styles/common";
import { getStore } from "pages/api/store";

const divider = css`
  height: 0.5rem;
  border: 0;
  background-color: ${Colors.neutral10};
`;

const margin = css`
  padding-bottom: 4.25rem;
`;

const Store = () => {
  const { query } = useRouter();

  const [mainSubsDesc, setMainSubsDesc] = useState("");

  const { data: storeData, isLoading } = useQuery(
    "Stores",
    () => getStore({ storeId: Number(query.id) }),
    {
      enabled: Boolean(query.id),
    }
  );

  // TODO: 찜하기 기능
  const pickStore = () => {
    alert("찜하기!");
  };

  useEffect(() => {
    if (!storeData) return;
    if (storeData.subscribeResponseDTOList.length > 0) {
      const mainSubsIndex = storeData.subscribeResponseDTOList.findIndex(
        (sub: { [index: string]: string }) => sub.isMain
      );
      setMainSubsDesc(storeData.subscribeResponseDTOList[mainSubsIndex]?.name || "");
    }
  }, [storeData]);

  return (
    <Layout title={storeData?.name ?? "단골손님"}>
      {isLoading && <FullPageSpinner />}
      {storeData && (
        <>
          <Info
            infoContent={{
              name: storeData.name,
              category: storeData.categoryType,
              images: storeData.storeImageUrlList,
              description: storeData.comments,
              menu: storeData.menuResponseDTOList,
              isPick: false, // FIXME: 다른 user api에서 가져오기
              mainSubsDesc: mainSubsDesc,
            }}
            onPick={pickStore}
          />
          <hr css={divider} />
          <Location
            address={storeData.newAddress}
            detail={storeData.detailedAddress}
            businessHours={storeData.businessHours}
          />
          <hr css={divider} />
          <Menus menuList={storeData.menuResponseDTOList} />
          <hr css={divider} />
          <Subs storeName={storeData.name} subsList={storeData.subscribeResponseDTOList} />
          <div css={margin} />
        </>
      )}
    </Layout>
  );
};

export default Store;
