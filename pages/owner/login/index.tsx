import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { css } from "@emotion/react";

import Layout from "common/layout";
import TextInput from "common/input/Text";
import { Colors, Texts } from "styles/common";
import Owner from "public/images/logo/Owner.svg";

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.25rem;
`;

const logoWrapper = css`
  display: flex;
  align-items: baseline;
  gap: 3px;
  padding-left: 1.5rem;
  margin-bottom: 2rem;
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const loginButton = css`
  margin-bottom: 2.25rem;
  width: 100%;
  background-color: ${Colors.amber50};
  color: ${Colors.white};
  height: 3.5rem;
  border-radius: 0.25rem;
  ${Texts.S3_18_M}
`;

const smallButtonWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    ${Texts.B3_15_R2};
    color: ${Colors.neutral70};
    background-color: transparent;
  }

  span {
    color: ${Colors.neutral60};
  }
`;

const OwnerLogin = () => {
  const { push } = useRouter();

  const [inputData, setInputData] = useState({ email: "", password: "" });
  const inputArr = [
    { objectKey: "email", placeholder: "이메일을 입력해주세요" },
    { objectKey: "password", placeholder: "비밀번호를 입력해주세요", inputType: "password" },
  ];

  const login = () => {
    // TODO: 로그인 API 추가
    if (!inputData.email.length || !inputData.password.length)
      return alert("이메일과 비밀번호를 입력해주세요.");
    push("/owner");
  };

  return (
    <>
      <Layout title="사장님 로그인" subTitle="로그인">
        <div css={wrapper}>
          <div css={logoWrapper}>
            <Image src="/images/logo/Logo.png" alt="로고" width={43} height={57} />
            <Owner />
          </div>
          <form css={inputWrapper}>
            {inputArr.map((el) => (
              <TextInput
                key={el.objectKey}
                state={inputData[el.objectKey as "email" | "password"]}
                width="100%"
                objectKey={el.objectKey}
                setState={setInputData}
                placeholder={el.placeholder}
                inputType={el.inputType as "password"}
              />
            ))}
          </form>
          <button css={loginButton} onClick={login}>
            로그인
          </button>
          <div css={smallButtonWrapper}>
            <button onClick={() => push("/owner/login/signup")}>회원가입</button>
            <span>|</span>
            <button>비밀번호 찾기</button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OwnerLogin;
