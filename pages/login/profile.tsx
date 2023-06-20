import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import Layout from "common/layout";
import AddProfile from "customer/login/addProfile";
import useLoginStore from "src/store/userLogin";
import { getUserInfo } from "pages/api/user";

const Profile = () => {
  const { login } = useLoginStore();
  const { push, query } = useRouter();

  const { data, isFetching } = useQuery("customer", getUserInfo, {
    enabled: Boolean(query.token),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!query.token) return;
    localStorage.setItem("userAccessToken", String(query.token));
    login();
  }, [query]);

  useEffect(() => {
    if (data?.roleType === "USER") push("/");
  }, [data]);

  if (isFetching) return null;

  return (
    <>
      <Layout title="회원가입" subTitle="가입 정보 입력" goHome={true}>
        <AddProfile />
      </Layout>
    </>
  );
};

export default Profile;
