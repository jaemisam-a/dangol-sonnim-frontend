import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Layout from "common/layout";
import InputSection from "common/input/Section";
import { Colors, Texts } from "styles/common";

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

  const checkAuthNumber = () => {
    // TODO: 인증번호 확인 API 요청
    setIsApprove(true);
  };

  useEffect(() => {
    if (!query.email) push("/owner/login");
  }, []);

  if (!query.email) return null;

  return (
    <Layout title="사장님 회원가입" subTitle="인증번호 입력">
      <div css={wrapper}>
        <div css={description}>{query.email}으로 인증번호를 보냈어요</div>
        <InputSection
          isBottom={false}
          type="number"
          btn="확인"
          placeholder="인증번호를 입력해주세요"
          action={checkAuthNumber}
          state={String(authNumber)}
          setState={setAuthNumber}
        />
        <div css={submitButton(isApprove)}>
          <button>계정 생성</button>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerSignupEmail;
