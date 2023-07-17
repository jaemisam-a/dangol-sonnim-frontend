import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import Layout from "common/layout";
import AddProfile from "customer/login/addProfile";
import useLoginStore from "src/store/userLogin";
import { getUserInfo } from "pages/api/user";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { login } = useLoginStore();
  const { push, query } = useRouter();

  const { data, isFetching } = useQuery("customer", getUserInfo, {
    enabled: Boolean(query.token && localStorage.getItem("userAccessToken")),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!query.token) return;
    localStorage.setItem("userAccessToken", String(query.token));
    login();
  }, [query]);

  useEffect(() => {
    if (!data) return;
    if (data?.roleType === "USER") push("/");
    else setIsLoading(false);
  }, [data]);

  if (isFetching || isLoading) return null;

  return (
    <>
      <Layout title="회원가입" subTitle="가입 정보 입력" goHome={true}>
        <AddProfile />
      </Layout>
    </>
  );
};

export default Profile;
