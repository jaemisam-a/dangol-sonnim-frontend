import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { css } from "@emotion/react";

import Layout from "common/layout";
import FullPageSpinner from "common/spinner/FullPage";
import Subs from "customer/store/Subs";
import Menus from "customer/store/menu/Menus";
import Location from "customer/store/Location";
import Info from "customer/store/Info";
import { Colors } from "styles/common";

const divider = css`
  height: 0.5rem;
  border: 0;
  background-color: ${Colors.neutral10};
`;

const margin = css`
  padding-bottom: 4.25rem;
`;

const Store = () => {
  const [mainSubsDesc, setMainSubsDesc] = useState("");

  // FIXME: id에 맞는 api 요청
  const { data: storeData, isLoading } = useQuery("stores", () =>
    axios.get("/api/store").then((res) => res.data[0])
  );

  // TODO: 찜하기 기능
  const pickStore = () => {
    alert("찜하기!");
  };

  useEffect(() => {
    if (storeData) {
      const mainSubsIndex = storeData.subs.findIndex(
        (sub: { [index: string]: string }) => sub.isMain
      );
      setMainSubsDesc(storeData.subs[mainSubsIndex].description);
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
              category: storeData.category,
              images: storeData.images,
              description: storeData.description,
              menu: storeData.menu,
              isPick: false, // FIXME: 다른 user api에서 가져오기
              mainSubsDesc: mainSubsDesc,
            }}
            onPick={pickStore}
          />
          <hr css={divider} />
          <Location
            address={storeData.location.address}
            detail={storeData.location.detail}
            openHour={storeData.openHour}
          />
          <hr css={divider} />
          <Menus />
          <hr css={divider} />
          <Subs storeName={storeData.name} subsList={storeData.subs} />
          <div css={margin} />
        </>
      )}
    </Layout>
  );
};

export default Store;
