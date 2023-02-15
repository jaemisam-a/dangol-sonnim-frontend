import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Avatar from "customer/components/common/Avatar";
import InputSection from "customer/components/common/input/Section";
import Checkbox from "customer/components/common/input/Checkbox";

type InpustStateTypes = "error" | "success" | "";

const wrapper = css`
  padding: 3.75rem 1.25rem 0 1.25rem;
`;

const inputList = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-bottom: 1px solid ${Colors.neutral20};
  margin-top: 2.25rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const consentLabel = css`
  ${Texts.B1_13_M1}
  color: ${Colors.neutral90};
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.25rem;
`;

const consentDescription = css`
  ${Texts.C2_12_R}
  padding-left: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: ${Colors.neutral80};
  margin-bottom: 2rem;
`;

const submit = (isOkay: boolean) => css`
  width: 100%;
  padding: 0.688rem 0;
  background-color: ${isOkay ? Colors.amber50 : Colors.neutral20};
  border-radius: 0.25rem;
  cursor: ${isOkay ? "pointer" : "not-allowed"};
  color: ${isOkay ? Colors.white : Colors.neutral50};
  ${Texts.S3_18_M}
`;

const AddProfile = () => {
  const [isCheckedConsent, setIsCheckedConsent] = useState(false);
  const [inputState, setInputState] = useState<InpustStateTypes[]>(["", ""]);

  const checkValid = () => {
    // TODO: 닉네임 중복확인 api 요청
    const randomNum = Math.floor(Math.random() * 2) + 1;
    randomNum === 1
      ? setInputState((prev) => ["success", prev[1]])
      : setInputState((prev) => ["error", prev[1]]);
  };

  const requestAuth = () => {
    // TODO: 인증요청 api 요청
    setInputState((prev) => [prev[0], "success"]);
  };

  const inputArr = [
    {
      label: "닉네임",
      placeholder: "닉네임 입력",
      btn: "중복확인",
      isNecessary: true,
      btnFnc: checkValid,
      message: { success: "사용가능한 닉네임입니다.", error: "중복된 닉네임입니다." },
    },
    {
      label: "휴대폰 번호",
      placeholder: "휴대폰 번호 입력('-'제외)",
      btn: "인증요청",
      isNecessary: true,
      btnFnc: requestAuth,
      message: { success: "인증되었습니다." },
    },
  ];

  useEffect(() => {
    // TODO: 프로필 수집에 동의했을 경우 사진을 넣는 기능 추가
  }, []);

  return (
    <>
      <div css={wrapper}>
        <Avatar />
        <div css={inputList}>
          {inputArr.map((el, idx) => (
            <InputSection
              label={el.label}
              placeholder={el.placeholder}
              btn={el.btn}
              isBottom={false}
              key={el.label}
              isNecessary={el.isNecessary}
              state={inputState[idx]}
              action={el.btnFnc}
              message={el.message}
            />
          ))}
        </div>
        <div css={consentLabel}>
          <Checkbox setIsChecked={setIsCheckedConsent} />
          <span>개인정보 수집 및 이용 동의(필수)</span>
        </div>
        <div css={consentDescription}>
          <div>-개인정보 수집 목적: 원활한 구독권 서비스 이용을 위해 수집합니다.</div>
          <div>-개인정보 수집항목: 프로필 이미지, [필수]필명, [필수]휴대폰 번호</div>
          <div>
            -개인정보 이용기간: 회원 탈퇴 시 또는 개인정보처리 방침에 따라 보유 및 파기 됩니다.
          </div>
        </div>
        <button
          css={submit(
            isCheckedConsent && inputState[0] === "success" && inputState[1] === "success"
          )}
          disabled={isCheckedConsent || inputState[0] === "success" || inputState[1] === "success"}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default AddProfile;
