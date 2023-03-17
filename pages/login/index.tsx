import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Layout from "common/layout";
import SocialButton from "customer/login/socialButton";
import { Colors, Texts } from "styles/common";
import useLoginStore from "src/store/login";

const logoWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6.25rem;
  gap: 1.75rem;
  margin-bottom: 2.25rem;
`;

const phrase = css`
  color: ${Colors.neutral60};
  ${Texts.S3_18_B}

  & span {
    color: ${Colors.amber50};
  }
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`;

const Login = () => {
  const { isLogin } = useLoginStore();
  const { push } = useRouter();

  const socialArr = [
    { image: "/images/loginMethod/kakao.png", name: "카카오", bgColor: "#FFE500", color: "black" },
    { image: "/images/loginMethod/google.png", name: "구글", bgColor: "#FFFFFF", color: "black" },
    { image: "/images/loginMethod/apple.png", name: "Apple", bgColor: "#000000", color: "white" },
    { image: "/images/loginMethod/naver.png", name: "네이버", bgColor: "#03C75A", color: "white" },
  ];

  useEffect(() => {
    /**
     * TODO:
     * 가입 후 최초로그인 시에만 /profile로 이동
     * 로그인 된 상태에서 이 페이지 접속 시 /로 이동
     *  */

    if (isLogin) {
      push("/login/profile");
    }
  }, [isLogin]);

  return (
    <>
      <Layout title="로그인" isNoHeader={true}>
        <div css={logoWrapper}>
          <Image src="/images/logo/logoExclude.png" alt="로고" width="140" height="107" />
          <div css={phrase}>
            내 주변 맞춤 혜택,&nbsp;
            <span>단골손님</span>
            에서!
          </div>
        </div>
        <div css={buttonWrapper}>
          {socialArr.map((content) => (
            <SocialButton
              bgColor={content.bgColor}
              color={content.color}
              image={content.image}
              name={content.name}
              key={content.name}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Login;
