import React from "react";

import Layout from "src/components/common/layout";
import AddProfile from "src/components/customer/login/AddProfile";

const Profile = () => {
  return (
    <>
      <Layout title="회원가입" subTitle="가입 입력 정보">
        <AddProfile />
      </Layout>
    </>
  );
};

export default Profile;
