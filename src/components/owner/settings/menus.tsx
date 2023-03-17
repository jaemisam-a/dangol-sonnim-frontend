import React, { useState } from "react";

import Empty from "owner/settings/empty";
import StoreSection from "owner/settings/section";
import { statusType } from "common/popover";

const Menus = () => {
  const [status, setStatus] = useState<statusType>("default");

  return (
    <StoreSection
      status={status}
      setStatus={setStatus}
      sectionTitle="메뉴"
      isLocation={false}
      isEmpty={true}
    >
      <Empty
        backgroundColor="transparent"
        description={"현재 등록된 메뉴가 없습니다.\n메뉴를 등록해주세요."}
        isTop={false}
      />
    </StoreSection>
  );
};

export default Menus;
