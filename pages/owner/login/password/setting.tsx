import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import TextInput from "common/input/text";
import OwnerLayout from "common/layout/owner";
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

const Setting = () => {
  const { push } = useRouter();

  const [pw, setPw] = useState("");

  const saveNewPw = () => {
    /** TODO: 새로운 비밀번호 저장 후 로그인 페이지로 이동 */
    push("/owner/login");
  };

  /** TODO: 이메일 링크 ID 확인되지 않으면 return null */
  return (
    <OwnerLayout title="비밀번호 재설정" subTitle="비밀번호 재설정">
      <form onSubmit={saveNewPw} css={formWrapper}>
        <TextInput
          type="text"
          placeholder="새 비밀번호를 입력해주세요"
          state={pw}
          setState={setPw}
          minValue={8}
          maxValue={16}
        />
        <button type="submit" css={[fullAmberButtonStyle, buttonStyle]}>
          비밀번호 저장
        </button>
        <div css={linkWrapper}>
          <Link href="/owner/login">로그인</Link>
          <span>|</span>
          <Link href="/owner/signup">회원가입</Link>
        </div>
      </form>
    </OwnerLayout>
  );
};
export default Setting;
