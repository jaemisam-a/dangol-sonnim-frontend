import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { css } from "@emotion/react";

import InputWithButton, { InputWithButtonType } from "common/input/withButton";
import { InputStatus } from "common/input/text";
import { Colors, Texts } from "styles/common";

type PhoneChangeProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 1.25rem 3.25rem 1.25rem;
`;

const label = css`
  color: ${Colors.neutral80};
  ${Texts.B3_15_M2}

  span {
    color: ${Colors.amber50};
  }
`;

const submitButton = (isEmpty: boolean) => css`
  color: ${isEmpty ? Colors.neutral50 : Colors.white};
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: ${isEmpty ? Colors.neutral20 : Colors.amber50};
  border-radius: 0.25rem;
  cursor: ${isEmpty ? "not-allowed" : "pointer"};
  ${Texts.S1_16_M};
`;

const PhoneChange = (props: PhoneChangeProps) => {
  const [inputData, setInputData] = useState({ phone: "", phoneAuth: "" });
  const [inputArr, setInputArr] = useState<InputWithButtonType[]>([]);
  const [inputStatus, setInputStatus] = useState<InputStatus[]>(["", ""]);

  const requestAuth = () => {
    // TODO: 인증요청 api 요청
    if (!inputData.phone) return alert("전화번호를 입력하세요.");
    setInputArr((prev) => [
      { ...prev[0], btnName: "재발송" },
      { ...prev[1], isHidden: false },
    ]);
    setInputStatus((prev) => [prev[0], "info"]);
  };

  const checkAuth = () => {
    // TODO: 문자인증 api 요청
    if (!inputData.phoneAuth) return alert("인증번호를 입력하세요.");
    const randomNum = Math.floor(Math.random() * 2) + 1;
    randomNum === 1
      ? setInputStatus((prev) => [prev[0], "success"])
      : setInputStatus((prev) => [prev[0], "error"]);
  };

  useEffect(() => {
    setInputArr([
      {
        objectKey: "phone",
        placeholder: "핸드폰 번호 입력",
        type: "number",
        btnName: "발송",
        btnAction: requestAuth,
      },
      {
        objectKey: "phoneAuth",
        isHidden: true,
        type: "number",
        placeholder: "인증번호 입력",
        btnName: "문자인증",
        btnAction: checkAuth,
        inputStatusMessage: {
          success: "인증되었습니다.",
          info: "문자로 전송된 숫자를 입력해주세요.",
          error: "인증번호가 맞지 않습니다.",
        },
        minValue: 4,
        maxValue: 4,
      },
    ]);
  }, []);

  useEffect(() => {
    setInputArr((prev) => [
      { ...prev[0], btnAction: requestAuth },
      { ...prev[1], btnAction: checkAuth },
    ]);
  }, [inputData]);

  const isEmpty = Object.values(inputData).some((el) => !el) || inputStatus[1] !== "success";

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 핸드폰 번호 변경 api 요청
    props.setOpen(false);
  };

  return (
    <>
      <form onSubmit={submit} css={wrapper}>
        <label css={label}>
          변경할 핸드폰 번호<span>*</span>
        </label>
        {inputArr.map((el, idx) => (
          <InputWithButton
            key={el.objectKey}
            isInBottomSheet={false}
            state={inputData[el.objectKey as "phone" | "phoneAuth"]}
            type={el.type}
            btnName={el.btnName}
            btnAction={el.btnAction}
            inputStatusMessage={el.inputStatusMessage}
            isHidden={el.isHidden}
            minValue={el.minValue}
            maxValue={el.maxValue}
            placeholder={el.placeholder}
            objectKey={el.objectKey}
            setState={setInputData}
            inputStatus={inputStatus[idx]}
          />
        ))}
        <button disabled={isEmpty} css={submitButton(isEmpty)}>
          확인
        </button>
      </form>
    </>
  );
};

export default PhoneChange;
