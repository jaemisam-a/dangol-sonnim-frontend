import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import Layout from "common/layout";
import SocialButton from "customer/login/SocialButton";
import { Colors, Texts } from "styles/common";

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
  const socialArr = [
    { image: "/images/loginMethod/Kakao.png", name: "카카오", bgColor: "#FFE500", color: "black" },
    { image: "/images/loginMethod/Google.png", name: "구글", bgColor: "#FFFFFF", color: "black" },
    { image: "/images/loginMethod/Apple.png", name: "Apple", bgColor: "#000000", color: "white" },
    { image: "/images/loginMethod/Naver.png", name: "네이버", bgColor: "#03C75A", color: "white" },
  ];

  return (
    <>
      <Layout title="로그인" isNoHeader={true}>
        <div css={logoWrapper}>
          <Image src="/images/logo/LogoExclude.png" alt="로고" width="140" height="107" />
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
