import React, { Dispatch, SetStateAction, useEffect, useId, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import { Colors, Texts } from "styles/common";
import Avatar from "common/Avatar";
import InputSection from "common/input/Section";
import Checkbox from "common/input/Checkbox";

type InputStateTypes = "error" | "success" | "info" | "";

type InputSectionTypes = {
  label?: string;
  placeholder?: string;
  btn?: string;
  isRequired?: boolean;
  state?: InputStateTypes;
  btnFnc?: () => void;
  message?: { error?: string; success: string; info?: string };
  setState?: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<string>>;
  objectKey: string;
  hidden?: boolean;
  type: "text" | "number" | "";
};

const wrapper = css`
  padding: 3.75rem 1.25rem 0 1.25rem;
`;

const inputList = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-bottom: 1px solid ${Colors.neutral20};
  padding-bottom: 1rem;
  margin-top: 2.25rem;
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
  const checkboxId = useId();
  const { push } = useRouter();

  const [isCheckedConsent, setIsCheckedConsent] = useState(false);
  const [inputState, setInputState] = useState<InputStateTypes[]>(["", "", ""]);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    phoneAuth: "",
    birthday: "",
  });
  const [inputArr, setInputArr] = useState<InputSectionTypes[]>([]);

  const checkValid = () => {
    // TODO: 닉네임 중복확인 api 요청
    if (!profileData.name) return alert("닉네임을 입력하세요.");
    const randomNum = Math.floor(Math.random() * 2) + 1;
    randomNum === 1
      ? setInputState((prev) => ["success", prev[1], prev[2]])
      : setInputState((prev) => ["error", prev[1], prev[2]]);
  };

  const requestAuth = () => {
    // TODO: 인증요청 api 요청
    if (!profileData.phone) return alert("전화번호를 입력하세요.");
    setInputArr((prev) => [
      prev[0],
      { ...prev[1], btn: "재전송" },
      { ...prev[2], hidden: false },
      prev[3],
    ]);
    setInputState((prev) => [prev[0], prev[1], "info"]);
  };

  const checkAuth = () => {
    // TODO: 문자인증 api 요청
    if (!profileData.phoneAuth) return alert("인증번호를 입력하세요.");
    const randomNum = Math.floor(Math.random() * 2) + 1;
    randomNum === 1
      ? setInputState((prev) => [prev[0], prev[1], "success"])
      : setInputState((prev) => [prev[0], prev[1], "error"]);
  };

  useEffect(() => {
    // TODO: 프로필 수집에 동의했을 경우 사진을 넣는 기능 추가
    setInputArr([
      {
        label: "닉네임",
        placeholder: "닉네임 입력",
        btn: "중복확인",
        isRequired: true,
        btnFnc: checkValid,
        message: { success: "사용가능한 닉네임입니다.", error: "중복된 닉네임입니다." },
        objectKey: "name",
        type: "text",
      },
      {
        label: "휴대폰 번호",
        placeholder: "휴대폰 번호 입력('-'제외)",
        btn: "인증요청",
        isRequired: true,
        btnFnc: requestAuth,
        objectKey: "phone",
        type: "number",
      },
      {
        btn: "문자인증",
        btnFnc: checkAuth,
        message: {
          success: "인증되었습니다.",
          info: "문자로 전송된 숫자를 입력해주세요.",
          error: "인증번호가 맞지 않습니다.",
        },
        objectKey: "phoneAuth",
        hidden: true,
        type: "number",
      },
      {
        label: "생년월일",
        placeholder: "19950324",
        isRequired: true,
        objectKey: "birthday",
        type: "number",
      },
    ]);
  }, []);

  useEffect(() => {
    setInputArr((prev) => [
      { ...prev[0], btnFnc: checkValid },
      { ...prev[1], btnFnc: requestAuth },
      { ...prev[2], btnFnc: checkAuth },
      { ...prev[3] },
    ]);
  }, [profileData]);

  const isPossible =
    isCheckedConsent &&
    inputState[0] === "success" &&
    inputState[2] === "success" &&
    Boolean(profileData.birthday);

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
              key={idx}
              isRequired={el.isRequired}
              inputState={inputState[idx]}
              action={el.btnFnc}
              message={el.message}
              setState={setProfileData}
              objectKey={el.objectKey}
              hidden={el.hidden}
              type={el.type}
              state={profileData[el.objectKey as "name" | "phone" | "phoneAuth" | "birthday"]}
            />
          ))}
        </div>
        <div css={consentLabel}>
          <Checkbox setIsChecked={setIsCheckedConsent} forId={checkboxId} />
          <label htmlFor={checkboxId}>개인정보 수집 및 이용 동의(필수)</label>
        </div>
        <div css={consentDescription}>
          <div>-개인정보 수집 목적: 원활한 구독권 서비스 이용을 위해 수집합니다.</div>
          <div>-개인정보 수집항목: 프로필 이미지, [필수]필명, [필수]휴대폰 번호</div>
          <div>
            -개인정보 이용기간: 회원 탈퇴 시 또는 개인정보처리 방침에 따라 보유 및 파기 됩니다.
          </div>
        </div>
        <button
          css={submit(isPossible)}
          disabled={!isPossible}
          onClick={() => isPossible && push("/")}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default AddProfile;
