import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import Layout from "common/layout";
import AddProfile from "customer/login/addProfile";
import useLoginStore from "src/store/login";
import { getUser } from "pages/api/user";

const Profile = () => {
  const { login } = useLoginStore();
  const { push, query } = useRouter();

  const { data } = useQuery("customer", () => getUser(String(query.token)), {
    enabled: Boolean(query.token),
  });

  useEffect(() => {
    if (!query.token) return;
    localStorage.setItem("userAccessToken", String(query.token));
    login();
  }, [query]);

  if (data?.roleType === "USER") return push("/");

  return (
    <>
      <Layout title="회원가입" subTitle="가입 정보 입력" goHome={true}>
        <AddProfile />
      </Layout>
    </>
  );
};

export default Profile;
