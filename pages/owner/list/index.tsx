import React from "react";

import OwnerLayout from "common/layout/owner";
import devOnly from "src/utils/devOnly";

// TODO: 회원리스트 구현
const List = () => {
  return (
    <OwnerLayout title="회원리스트" isLogo={true}>
      <div>List</div>
    </OwnerLayout>
  );
};

export default List;
export const getServerSideProps = devOnly;
