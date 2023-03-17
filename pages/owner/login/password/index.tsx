import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { css } from "@emotion/react";

import TextInput from "common/input/text";
import Layout from "common/layout";
import { Colors, fullAmberButtonStyle, Texts } from "styles/common";

const formWrapper = css`
  padding: 5.625rem 1.25rem;
  text-align: center;

  h1 {
    color: ${Colors.neutral80};
    ${Texts.S1_16_M}
    margin-bottom: 0.75rem;
  }
`;

const linkWrapper = css`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  ${Texts.B3_15_R2}
  color: ${Colors.neutral70};

  span {
    color: ${Colors.neutral60};
  }
`;

const buttonStyle = css`
  margin: 3.625rem 0 2.25rem;
`;

const FindPassword = () => {
  const [email, setEmail] = useState("");

  const submitEmail = (e: FormEvent<HTMLFormElement>) => {
    /** TODO: 이메일 발송 api */
    e.preventDefault();
    alert("메일을 확인해주세요!");
  };

  return (
    <Layout title="비밀번호 찾기" subTitle="비밀번호 찾기">
      <form onSubmit={submitEmail} css={formWrapper}>
        <h1>비밀번호 재설정을 위해 이메일 주소를 입력해주세요 (메일 발송 1~2분 소요)</h1>
        <TextInput
          type="email"
          placeholder="이메일을 입력해주세요"
          state={email}
          setState={setEmail}
        />
        <button type="submit" css={[fullAmberButtonStyle, buttonStyle]}>
          메일 전송하기
        </button>
        <div css={linkWrapper}>
          <Link href="/owner/login">로그인</Link>
          <span>|</span>
          <Link href="/owner/signup">회원가입</Link>
        </div>
      </form>
    </Layout>
  );
};

export default FindPassword;
