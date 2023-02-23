import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "src/components/common/layout";
import AddProfile from "src/components/customer/login/AddProfile";
import useLoginStore from "src/store/login";

const Profile = () => {
  const { isLogin } = useLoginStore();
  const { push } = useRouter();

  useEffect(() => {
    // TODO:로그인 상태 확인
    if (!isLogin) push("/customer");
  }, [isLogin]);

  return (
    <>
      <Layout title="회원가입" subTitle="가입 입력 정보" goHome={true}>
        <AddProfile />
      </Layout>
    </>
  );
};

export default Profile;
