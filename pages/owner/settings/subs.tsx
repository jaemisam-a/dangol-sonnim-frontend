import React from "react";

import Layout from "common/layout";
import SubsForm from "owner/settings/subsForm";

const Subs = () => {
  return (
    <Layout title="구독권등록" subTitle="구독권등록" isXButton={true} isCheckButton={true}>
      <SubsForm />
    </Layout>
  );
};

export default Subs;
