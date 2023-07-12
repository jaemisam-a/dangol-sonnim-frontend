import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

// input의 상태, 3가지로 구분
export type InputStatus = "error" | "success" | "info" | "";

// input의 상태에 따른 메시지
type InputMessage = {
  error?: string;
  success: string;
  info?: string;
};

// input의 타입, 4가지로 구분
export type InputType = "text" | "number" | "email" | "password";

export type TextInputType = {
  objectKey?: string;
  placeholder?: string;
  inputStatusMessage?: InputMessage;
  type: InputType;
  // input 최대 글자 수 및 최소 글자 수
  maxValue?: number;
  minValue?: number;
};

type TextInputProps = {
  // input과 메시지를 포함한 전체 너비
  wrapperWidth?: string;
  // input의 값과 그 값을 관리하는 setstate함수, string 또는 object가 들어올 수 있기에 any 추가.
  state: any | string;
  setState?: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<string>>;
  inputStatus?: InputStatus;
} & TextInputType;

const wrapper = (width?: string) => css`
  display: flex;
  flex-direction: column;
  width: ${width ?? "100%"};
`;

const input = (inputStatus?: InputStatus, state?: string) => css`
  ${Texts.B3_15_R1}
  padding: 0.688rem 0.75rem;
  border: 1px solid
    ${inputStatus === "error"
      ? Colors.red40
      : inputStatus === "success"
      ? Colors.blue50
      : state
      ? Colors.neutral40
      : Colors.neutral30};
  border-radius: 0.25rem;
`;

const errorOrInfo = css`
  ${Texts.C2_12_R}
  color: ${Colors.red40};
`;

const success = css`
  ${Texts.C2_12_R}
  color: ${Colors.blue50};
`;

const TextInput = (props: TextInputProps) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!props.setState) return;
    if (props.type === "number" && isNaN(Number(e.target.value))) return;
    if (props.objectKey) {
      props.setState((prev: any) => {
        return { ...prev, [props.objectKey as string]: e.target.value };
      });
    } else {
      props.setState(e.target.value);
    }
  };

  return (
    <div css={wrapper(props.wrapperWidth)}>
      <input
        type={props.type === "password" || props.type === "email" ? props.type : "search"}
        css={input(props.inputStatus, props.state)}
        placeholder={props.placeholder}
        onChange={handleInput}
        value={props.state || ""}
        spellCheck={false}
        autoComplete="on"
        maxLength={props.maxValue}
        minLength={props.minValue}
        required
      />
      {props.inputStatus === "info" && (
        <div css={errorOrInfo}>{props.inputStatusMessage?.info}</div>
      )}
      {props.inputStatus === "error" && (
        <div css={errorOrInfo}>{props.inputStatusMessage?.error}</div>
      )}
      {props.inputStatus === "success" && (
        <div css={success}>{props.inputStatusMessage?.success}</div>
      )}
    </div>
  );
};

export default TextInput;
