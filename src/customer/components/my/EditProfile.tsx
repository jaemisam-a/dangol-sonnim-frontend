import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Avatar from "customer/components/common/Avatar";
import InputSection from "customer/components/common/input/Section";

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding-top: 2.25rem;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
`;

const btnWrapper = css`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
  color: ${Colors.neutral60};
  cursor: pointer;
  width: fit-content;
  ${Texts.B1_13_R2};
`;

const btnDivider = css`
  color: ${Colors.neutral50};
  cursor: default;
`;

const inputList = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-bottom: 1px solid ${Colors.neutral20};
  margin-top: 1rem;
  padding-bottom: 0.75rem;
`;

const EditProfile = () => {
  return (
    <>
      <div css={wrapper}>
        <Avatar />
        <div css={inputList}>
          <InputSection label="닉네임" placeholder="닉네임 입력" btn="중복확인" isBottom={true} />
          <InputSection
            label="휴대폰 번호"
            placeholder="휴대폰 번호 입력('-'제외)"
            btn="다시 본인인증"
            isBottom={true}
          />
        </div>
        <div css={btnWrapper}>
          <span>로그아웃</span>
          <span css={btnDivider}>|</span>
          <span>회원탈퇴</span>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
