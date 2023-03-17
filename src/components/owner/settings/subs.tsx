import React, { useState } from "react";

import Empty from "owner/settings/empty";
import StoreSection from "owner/settings/section";
import { statusType } from "common/popover";

const Subs = () => {
  const [status, setStatus] = useState<statusType>("default");

  return (
    <StoreSection
      status={status}
      setStatus={setStatus}
      sectionTitle="구독권"
      isLocation={false}
      isEmpty={true}
    >
      <Empty
        backgroundColor="transparent"
        description={"현재 등록된 구독권이 없습니다.\n구독권을 등록해주세요."}
        isTop={false}
      />
    </StoreSection>
  );
};

export default Subs;
