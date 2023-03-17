import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { css } from "@emotion/react";

import InputWithButton, { InputWithButtonType } from "common/input/withButton";
import { Colors, Texts } from "styles/common";

type PasswordChangeProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 1.25rem 3.25rem 1.25rem;
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

const PasswordChange = (props: PasswordChangeProps) => {
  const [inputData, setInputData] = useState({ current: "", change: "", changeCheck: "" });

  const inputArr: InputWithButtonType[] = [
    {
      type: "password",
      label: "현재 비밀번호",
      objectKey: "current",
    },
    {
      type: "password",
      label: "변경할 비밀번호",
      objectKey: "change",
    },
    {
      type: "password",
      label: "변경할 비밀번호 재입력",
      objectKey: "changeCheck",
    },
  ];

  const isEmpty = Object.values(inputData).some((el) => !el);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 비밀번호 수정 api 요청
    if (inputData.change !== inputData.changeCheck)
      return alert("재입력한 비밀번호가 일치하지 않습니다.");
    props.setOpen(false);
  };

  return (
    <>
      <form onSubmit={submit} css={wrapper}>
        {inputArr.map((el) => (
          <InputWithButton
            key={el.label}
            isInBottomSheet={false}
            state={inputData[el.objectKey as "current" | "change" | "changeCheck"]}
            type={el.type}
            isRequired={true}
            label={el.label}
            minValue={8}
            maxValue={16}
            objectKey={el.objectKey}
            setState={setInputData}
          />
        ))}
        <button disabled={isEmpty} css={submitButton(isEmpty)}>
          확인
        </button>
      </form>
    </>
  );
};

export default PasswordChange;
