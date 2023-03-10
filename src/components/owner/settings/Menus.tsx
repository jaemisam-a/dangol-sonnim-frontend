import React from "react";

import Empty from "owner/settings/Empty";
import StoreSection from "owner/settings/Section";

const Menus = () => {
  return (
    <StoreSection sectionTitle="메뉴" isLocation={false} isEmpty={true}>
      <Empty
        backgroundColor="transparent"
        description={"현재 등록된 메뉴가 없습니다.\n메뉴를 등록해주세요."}
        isTop={false}
      />
    </StoreSection>
  );
};

export default Menus;
