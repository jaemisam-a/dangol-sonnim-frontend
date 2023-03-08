import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Layout from "common/layout";
import InputSection from "common/input/Section";
import Consent from "common/Consent";
import { Colors, Texts } from "styles/common";

type InpustStateTypes = "error" | "success" | "info" | "";

type InputSectionTypes = {
  label?: string;
  placeholder?: string;
  btn?: string;
  isRequired?: boolean;
  state?: InpustStateTypes;
  btnFnc?: () => void;
  message?: { error?: string; success: string; info?: string };
  setState?: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<string>>;
  objectKey: string;
  hidden?: boolean;
  type: "text" | "number" | "";
  buttonType?: "password" | "search";
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding: 3.5rem 0;
  gap: 2rem;
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
  gap: 1.25rem;
  width: 100%;
`;

const nextButton = (isPossible: boolean) => css`
  padding: 0 1.25rem;

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

const OwnerSignup = () => {
  const { push } = useRouter();

  const [inputData, setInputData] = useState({ email: "", password: "", phone: "", phoneAuth: "" });
  const [inputArr, setInputArr] = useState<InputSectionTypes[]>([]);
  const [inputState, setInputState] = useState<InpustStateTypes[]>(["", "", "", ""]);
  const [isCheckedConsent, setIsCheckedConsent] = useState(false);

  const requestAuth = () => {
    // TODO: 인증요청 api 요청
    if (!inputData.phone) return alert("전화번호를 입력하세요.");
    setInputArr((prev) => [
      prev[0],
      prev[1],
      { ...prev[2], btn: "재전송" },
      { ...prev[3], hidden: false },
    ]);
    setInputState((prev) => [prev[0], prev[1], prev[2], "info"]);
  };

  const checkAuth = () => {
    // TODO: 문자인증 api 요청
    if (!inputData.phoneAuth) return alert("인증번호를 입력하세요.");
    const randomNum = Math.floor(Math.random() * 2) + 1;
    randomNum === 1
      ? setInputState((prev) => [prev[0], prev[1], prev[2], "success"])
      : setInputState((prev) => [prev[0], prev[1], prev[2], "error"]);
  };

  useEffect(() => {
    setInputArr([
      { objectKey: "email", placeholder: "이메일을 입력해주세요", type: "text" },
      {
        objectKey: "password",
        placeholder: "비밀번호를 입력해주세요",
        type: "text",
        buttonType: "password",
      },
      {
        objectKey: "phone",
        placeholder: "핸드폰 번호 입력",
        type: "number",
        btn: "발송",
        btnFnc: requestAuth,
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
        placeholder: "인증번호 입력",
      },
    ]);
  }, []);

  useEffect(() => {
    setInputArr((prev) => [
      prev[0],
      prev[1],
      { ...prev[2], btnFnc: requestAuth },
      { ...prev[3], btnFnc: checkAuth },
    ]);
  }, [inputData]);

  const isPossible =
    isCheckedConsent &&
    inputState[3] === "success" &&
    Boolean(inputData.phone) &&
    Boolean(inputData.email) &&
    Boolean(inputData.password) &&
    Boolean(inputData.phoneAuth);

  return (
    <Layout title="사장님 회원가입" subTitle="회원가입">
      <div css={wrapper}>
        <div css={inputWrapper}>
          {inputArr.map((el, idx) => (
            <InputSection
              key={el.objectKey}
              type={el.type as "text" | "number" | ""}
              isBottom={false}
              state={inputData[el.objectKey as "email" | "password" | "phone" | "phoneAuth"]}
              placeholder={el.placeholder}
              btn={el.btn}
              setState={setInputData}
              action={el.btnFnc}
              objectKey={el.objectKey}
              inputState={inputState[idx]}
              message={el.message}
              buttonType={el.buttonType}
              hidden={el.hidden}
            />
          ))}
        </div>
        <Consent
          isConsent={isCheckedConsent}
          setIsConsent={setIsCheckedConsent}
          consentArr={[
            { content: "단골손님 사장님 이용약관(필수)", objectKey: "first" },
            { content: "개인정보 수집 및 이용 동의(필수)", objectKey: "second" },
            { content: "위치기반 서비스 이용약관(필수)", objectKey: "third" },
            { content: "마케팅 정보 수신동의(필수)", objectKey: "fourth" },
          ]}
        />
        <div css={nextButton(isPossible)}>
          <button
            disabled={!isPossible}
            onClick={() =>
              push(
                { pathname: "/owner/login/signup/email", query: { email: inputData.email } },
                "/owner/login/signup/email"
              )
            }
          >
            다음
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerSignup;
