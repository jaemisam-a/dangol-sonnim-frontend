import React, { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { css } from "@emotion/react";

import Layout from "common/layout";
import TextInput, { TextInputType } from "common/input/text";
import { Colors, Texts } from "styles/common";
import Owner from "public/images/logo/owner.svg";
import { login } from "pages/api/owner/login";
import useOwnerLoginStore from "src/store/ownerLogin";

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

const formWrapper = css`
  width: 100%;
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
  }

  span {
    color: ${Colors.neutral60};
  }
`;

const OwnerLogin = () => {
  const { push } = useRouter();
  const { login: onLogin } = useOwnerLoginStore();

  const [inputData, setInputData] = useState({ email: "", password: "" });
  const inputArr: TextInputType[] = [
    { objectKey: "email", placeholder: "이메일을 입력해주세요", type: "email" },
    {
      objectKey: "password",
      placeholder: "비밀번호를 입력해주세요",
      type: "password",
      minValue: 8,
      maxValue: 16,
    },
  ];

  const { mutateAsync } = useMutation(login);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    // TODO: 로그인 API 추가
    e.preventDefault();
    await mutateAsync({ email: inputData.email, password: inputData.password })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        onLogin();
        push("/owner");
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <>
      <Layout title="사장님 로그인" subTitle="로그인">
        <div css={wrapper}>
          <div css={logoWrapper}>
            <Image src="/images/logo/logo.png" alt="로고" width={43} height={57} />
            <Owner />
          </div>
          <form onSubmit={submit} css={formWrapper}>
            <div css={inputWrapper}>
              {inputArr.map((el) => (
                <TextInput
                  key={el.objectKey}
                  state={inputData[el.objectKey as "email" | "password"]}
                  objectKey={el.objectKey}
                  setState={setInputData}
                  placeholder={el.placeholder}
                  type={el.type}
                  maxValue={el.maxValue}
                  minValue={el.minValue}
                />
              ))}
            </div>
            <button type="submit" css={loginButton}>
              로그인
            </button>
          </form>
          <div css={smallButtonWrapper}>
            <Link href="/owner/signup">회원가입</Link>
            <span>|</span>
            <Link href="/owner/login/password">비밀번호 찾기</Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OwnerLogin;
