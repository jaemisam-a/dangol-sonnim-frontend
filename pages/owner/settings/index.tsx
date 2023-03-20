import React from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import Picture from "owner/settings/picture";
import Location from "owner/settings/location";
import Menus from "owner/settings/menus";
import Subs from "owner/settings/subs";
import Info from "owner/settings/info";

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

  return (
    <Layout title="가게설정" subTitle="가게 설정" isLogo={true}>
      <Picture />
      {/* prettier-ignore */}
      <Info name="정갈한솥" category="1" description={"\"오늘 뭐먹지?\" 고민 무조건 오면 해결!"} />
      <Location
        address="서울 구로구 디지털로 26길 111 지하 1층 002호"
        detail="서울대입구역 6번 출구에서 50m"
        openHour="10시에 영업시작"
      />
      <Menus data={menuDummyData} />
      <Subs />
      <div css={bottomPadding} />
    </Layout>
  );
};

export default Settings;
