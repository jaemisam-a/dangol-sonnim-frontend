import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type TextInputProps = {
  width: string;
  wrapperWidth?: string;
  setState?: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<string>>;
  objectKey?: string;
  placeholder?: string;
  state?: "error" | "success" | "info" | "";
  message?: { error?: string; success: string; info?: string };
};

const wrapper = (width: string) => css`
  display: flex;
  flex-direction: column;
  width: ${width};
`;

const input = (props: TextInputProps) => css`
  ${Texts.B3_15_R1}
  padding: 0.688rem 0.75rem;
  border: 1px solid
    ${props.state === "error"
      ? Colors.red40
      : props.state === "success"
      ? Colors.blue50
      : Colors.neutral40};
  border-radius: 0.25rem;
  width: ${props.width};
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
    if (props.objectKey) {
      props.setState((prev: any) => {
        return { ...prev, [props.objectKey as string]: e.target.value };
      });
    } else {
      props.setState(e.target.value);
    }
  };

  return (
    <div css={wrapper(props.wrapperWidth ?? "100%")}>
      <input
        type="search"
        css={input(props)}
        placeholder={props.placeholder}
        onChange={handleInput}
      />
      {props.state === "info" && <div css={errorOrInfo}>{props.message?.info}</div>}
      {props.state === "error" && <div css={errorOrInfo}>{props.message?.error}</div>}
      {props.state === "success" && <div css={success}>{props.message?.success}</div>}
    </div>
  );
};

export default TextInput;
