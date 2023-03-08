import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import TextInput from "common/input/Text";

type InputSectionProps = {
  label?: string;
  placeholder?: string;
  btn?: string;
  isBottom: boolean;
  isRequired?: boolean;
  inputState?: "error" | "success" | "info" | "";
  action?: () => void;
  message?: { error?: string; success: string };
  setState?: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<string>>;
  objectKey?: string;
  hidden?: boolean;
  state: string;
  type: "text" | "number" | "";
  buttonType?: "password" | "search";
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
  gap: 1rem;
`;

const inputBtn = (state?: "error" | "success" | "info" | "") => css`
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
  if (props.hidden) return null;
  return (
    <>
      <div css={inputWrapper}>
        {props.label && (
          <div css={inputLabel(props.isBottom)}>
            {props.label}
            <span>{props.isRequired && "*"}</span>
          </div>
        )}
        <div css={inputBtnWrapper}>
          <TextInput
            width="100%"
            wrapperWidth={props.btn ? "calc(100% - 6.75rem)" : "100%"}
            placeholder={props.placeholder}
            inputState={props.inputState}
            message={props.message}
            setState={props.setState}
            objectKey={props.objectKey}
            state={props.state}
            type={props.type}
            buttonType={props.buttonType}
          />
          {props.btn && (
            <button css={inputBtn(props.inputState)} onClick={props.action}>
              {props.btn}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputSection;
