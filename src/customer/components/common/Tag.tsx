import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

const Tag = ({ text }: { text: string }) => {
  const tagStyle = css`
    background-color: ${Colors.amber50};
    color: ${Colors.white};
    ${Texts.C1_11_M}
    padding: 1px 4px;
    width: fit-content;
    text-align: center;
    border-radius: 2px;
  `;

  return <div css={tagStyle}>{text}</div>;
};

export default Tag;
