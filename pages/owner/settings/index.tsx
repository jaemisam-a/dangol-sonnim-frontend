import React from "react";

import Layout from "common/layout";
import Picture from "owner/settings/Picture";
import Location from "owner/settings/Location";
import Menus from "owner/settings/Menus";
import Subs from "owner/settings/Subs";
import Info from "owner/settings/Info";

const Settings = () => {
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
      <Menus />
      <Subs />
    </Layout>
  );
};

export default Settings;
