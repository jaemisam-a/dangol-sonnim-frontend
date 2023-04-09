import React from "react";
import { useRouter } from "next/router";

import Layout from "common/layout";
import SubsForm from "owner/settings/subsForm";

const Subs = () => {
  const { query } = useRouter();
  const isEdit = Boolean(query?.subsId);

  return (
    <Layout
      title="메뉴 관리"
      subTitle={isEdit ? "구독권 수정" : "구독권 등록"}
      isXButton={true}
      checkBtnFnc={() => {}}
    >
      <SubsForm isEdit={isEdit} />
    </Layout>
  );
};

export default Subs;
