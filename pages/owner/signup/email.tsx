import React, { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Layout from "common/layout";
import InputWithButton from "common/input/withButton";
import { Colors, Texts } from "styles/common";
import { verifyEmailAuth } from "pages/api/owner/emailAuth";
import { signUp } from "pages/api/owner/sign";

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding: 6.25rem 1.25rem;
`;

const description = css`
  margin-bottom: 1.25rem;
  text-align: center;
  color: ${Colors.neutral80};
  ${Texts.S1_16_M};
`;

const submitButton = (isPossible: boolean) => css`
  margin-top: 4rem;

  button {
    width: 100%;
    height: 3.5rem;
    border-radius: 0.25rem;

    background-color: ${isPossible ? Colors.amber50 : Colors.neutral20};
    cursor: ${isPossible ? "pointer" : "not-allowed"};
    color: ${isPossible ? Colors.white : Colors.neutral50};
    ${Texts.S3_18_M}
  }
`;

const OwnerSignupEmail = () => {
  const { push, query } = useRouter();

  const [authNumber, setAuthNumber] = useState("");
  const [isApprove, setIsApprove] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { refetch } = useQuery(
    ["verifyEmail", { email: query.email, authCode: authNumber }],
    () => verifyEmailAuth(query.email as string, authNumber),
    { enabled: isValid }
  );
  const { mutate } = useMutation(signUp);

  const checkAuthNumber = () => {
    // TODO: 인증번호 확인 API 요청
    setIsValid(true);
    refetch().finally(() => setIsValid(false));
    setIsApprove(true);
  };

  const submitAccount = (e: FormEvent<HTMLFormElement>) => {
    // TODO: 회원가입 API 요청
    e.preventDefault();
    mutate({
      name: "단골손님",
      email: query.email as string,
      password: "abcd",
      phoneNumber: query.phone as string,
      marketingAgreement: true,
    });
    alert("회원가입!");
  };

  useEffect(() => {
    if (!query.email) push("/owner/login");
  }, []);

  if (!query.email) return null;

  return (
    <Layout title="사장님 회원가입" subTitle="인증번호 입력">
      <form onSubmit={submitAccount} css={wrapper}>
        <div css={description}>{query.email}으로 인증번호를 보냈어요</div>
        <InputWithButton
          isInBottomSheet={false}
          type="text"
          btnName="확인"
          placeholder="인증번호를 입력해주세요"
          btnAction={checkAuthNumber}
          state={String(authNumber)}
          setState={setAuthNumber}
        />
        <div css={submitButton(isApprove)}>
          <button type="submit">계정 생성</button>
        </div>
      </form>
    </Layout>
  );
};

export default OwnerSignupEmail;
