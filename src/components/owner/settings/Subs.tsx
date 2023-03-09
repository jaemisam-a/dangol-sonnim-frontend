import React from "react";

import Empty from "owner/settings/Empty";
import StoreSection from "owner/settings/Section";

const Subs = () => {
  return (
    <StoreSection sectionTitle="구독권" isLocation={false} isRegistration={false}>
      <Empty
        backgroundColor="transparent"
        description={"현재 등록된 구독권이 없습니다.\n구독권을 등록해주세요."}
        isTop={false}
      />
    </StoreSection>
  );
};

export default Subs;
