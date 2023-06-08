import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { css } from "@emotion/react";

import OwnerLayout from "common/layout/owner";
import InputWithButton from "common/input/withButton";
import { Colors, Texts } from "styles/common";
import { verifyEmailAuth } from "pages/api/owner/emailAuth";
import { signUp } from "pages/api/owner/signUp";

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

  const { mutateAsync: verifyEmail } = useMutation(verifyEmailAuth);
  const { mutateAsync: ownerSignUp } = useMutation(signUp);

  const checkAuthNumber = async () => {
    await verifyEmail({
      email: query.email as string,
      authCode: authNumber,
    }).then((res) => {
      if (res.isValid) {
        setIsApprove(true);
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    });
  };

  const submitAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await ownerSignUp({
      name: query.name as string,
      email: query.email as string,
      password: query.password as string,
      phoneNumber: query.phone as string,
      marketingAgreement: true,
    })
      .then(() => {
        alert("회원가입 되었습니다.");
        push("/owner/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    if (!query.email) push("/owner/login");
  }, []);

  if (!query.email) return null;

  return (
    <OwnerLayout title="사장님 회원가입" subTitle="인증번호 입력">
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
          <button disabled={!isApprove} type="submit">
            계정 생성
          </button>
        </div>
      </form>
    </OwnerLayout>
  );
};

export default OwnerSignupEmail;
