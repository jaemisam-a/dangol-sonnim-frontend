import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";

import AddPlusCircle from "public/icons/AddPlusCircle.svg";
import { Colors, Texts } from "styles/common";
import TextInput from "customer/components/common/input/Text";

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
`;

const profileWrapper = css`
  display: flex;
  justify-content: center;
  padding-top: 2.25rem;
  padding-bottom: 1rem;
`;

const profileImageWrapper = css`
  position: relative;
`;

const inputLabel = css`
  ${Texts.S1_16_B}
`;

const btnWrapper = css`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
  color: ${Colors.neutral60};
  cursor: pointer;
  ${Texts.B1_13_R2};
`;

const btnDivider = css`
  color: ${Colors.neutral50};
  cursor: default;
`;

const addImage = css`
  position: absolute;
  right: -0.438rem;
  bottom: 0.375rem;
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const inputBtnWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const inputBtn = css`
  width: 6.75rem;
  height: fit-content;
  padding: 0.5rem 0.75rem;
  background-color: ${Colors.amber50};
  border-radius: 0.25rem;
  cursor: pointer;
  color: ${Colors.white};
  ${Texts.B3_15_M2}
`;

const inputList = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-bottom: 1px solid ${Colors.neutral20};
  padding-bottom: 0.75rem;
`;

const EditProfile = () => {
  return (
    <>
      <div css={wrapper}>
        <div css={profileWrapper}>
          <div css={profileImageWrapper}>
            <Image src="/images/Profile.png" alt="이미지 변경" width="80" height="80" />
            <AddPlusCircle css={addImage} />
          </div>
        </div>
        <div css={inputList}>
          <div css={inputWrapper}>
            <div css={inputLabel}>닉네임</div>
            <div css={inputBtnWrapper}>
              <TextInput />
              <button css={inputBtn}>중복확인</button>
            </div>
          </div>
          <div css={inputWrapper}>
            <div css={inputLabel}>휴대폰 번호</div>
            <div css={inputBtnWrapper}>
              <TextInput />
              <button css={inputBtn}>다시 본인인증</button>
            </div>
          </div>
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
