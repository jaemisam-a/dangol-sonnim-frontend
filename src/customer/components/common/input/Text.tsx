import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type TextInputProps = {
  width: string;
};

const input = (props: TextInputProps) => css`
  ${Texts.B3_15_R1}
  padding: 0.688rem 0.75rem;
  border: 1px solid ${Colors.neutral40};
  border-radius: 0.25rem;
  width: ${props.width};
`;

const TextInput = (props: TextInputProps) => {
  return (
    <>
      <input type="search" css={input(props)} />
    </>
  );
};

export default TextInput;
