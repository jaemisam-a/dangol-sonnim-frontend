import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type TextInputProps = {
  width: string;
  setState?: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<string>>;
  objectKey?: string;
  placeholder?: string;
  state?: "error" | "success" | "";
  message?: { error?: string; success: string };
};

const wrapper = css`
  display: flex;
  flex-direction: column;
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

const error = css`
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
    <div css={wrapper}>
      <input
        type="search"
        css={input(props)}
        placeholder={props.placeholder}
        onChange={handleInput}
      />
      {props.state === "error" && <div css={error}>{props.message?.error}</div>}
      {props.state === "success" && <div css={success}>{props.message?.success}</div>}
    </div>
  );
};

export default TextInput;
