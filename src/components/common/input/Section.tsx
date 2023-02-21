import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import TextInput from "common/input/Text";

type InputSectionProps = {
  label: string;
  placeholder?: string;
  btn: string;
  isBottom: boolean;
  isRequired?: boolean;
  state?: "error" | "success" | "";
  action?: () => void;
  message?: { error?: string; success: string };
};

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

const inputBtn = (state?: "error" | "success" | "") => css`
  width: 6.75rem;
  height: fit-content;
  padding: 0.5rem 0.75rem;
  background-color: ${Colors.amber50};
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: ${state && "1.125rem"};
  color: ${Colors.white};
  ${Texts.B3_15_M2}
`;

const inputLabel = (isBottom: boolean) => css`
  ${isBottom ? Texts.S1_16_B : Texts.B3_15_M2}
  color: ${isBottom ? "black" : Colors.neutral80};
  & span {
    color: ${Colors.amber50};
  }
`;

const InputSection = (props: InputSectionProps) => {
  return (
    <>
      <div css={inputWrapper}>
        <div css={inputLabel(props.isBottom)}>
          {props.label}
          <span>{props.isRequired && "*"}</span>
        </div>
        <div css={inputBtnWrapper}>
          <TextInput
            width="12.5rem"
            placeholder={props.placeholder}
            state={props.state}
            message={props.message}
          />
          <button css={inputBtn(props.state)} onClick={props.action}>
            {props.btn}
          </button>
        </div>
      </div>
    </>
  );
};

export default InputSection;
