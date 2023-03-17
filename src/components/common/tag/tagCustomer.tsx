import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type TagProps = {
  text: string;
  bgColor?: string;
  bold?: boolean;
};

const Tag = ({ text, bgColor, bold }: TagProps) => {
  const tagStyle = css`
    background-color: ${bgColor ?? Colors.amber50};
    color: ${Colors.white};
    ${bold ? Texts.C1_11_B : Texts.C1_11_M}
    padding: 1px 4px;
    width: fit-content;
    text-align: center;
    border-radius: 2px;
  `;

  return <div css={tagStyle}>{text}</div>;
};

export default Tag;
