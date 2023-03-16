import React from "react";

import Empty from "owner/settings/Empty";
import SettingButton from "owner/settings/SettingButton";
import { Colors } from "styles/common";
import Camera from "public/icons/etc/Camera.svg";

const Picture = () => {
  return (
    <>
      <Empty
        backgroundColor={Colors.neutral20}
        description={"현재 등록된 가게 사진이 없습니다.\n가게 사진을 등록해주세요."}
        isTop={true}
      />
      <SettingButton
        heading="가게 사진 설정"
        icon={<Camera />}
        action={() => alert("가게 정보 설정!")}
      />
    </>
  );
};

export default Picture;
