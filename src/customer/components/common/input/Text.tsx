import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

const input = css`
  ${Texts.B3_15_R1}
  padding: 0.688rem 0.75rem;
  border: 1px solid ${Colors.neutral40};
  border-radius: 0.25rem;
`;

const TextInput = () => {
  return (
    <>
      <input type="search" css={input} />
    </>
  );
};

export default TextInput;
