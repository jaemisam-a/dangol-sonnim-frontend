import React from "react";
import { css } from "@emotion/react";

import categoryIdToString from "src/utils/categoryIdToString";
import { Colors, Texts } from "styles/common";

type InfoProps = {
  name: string;
  category: string;
  description: string;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  border-bottom: 0.25rem solid ${Colors.neutral10};
  padding-bottom: 1.188rem;
`;

const titleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  h1 {
    ${Texts.H2_21_B}
    margin: 0;
  }

  span {
    ${Texts.B2_14_R1}
    color:${Colors.neutral50}
  }
`;

const descriptionStyle = css`
  ${Texts.B1_13_R2}
  color:${Colors.neutral80};
  margin-bottom: 0.5rem;
`;

const Info = (props: InfoProps) => {
  return (
    <div css={wrapper}>
      <div css={titleStyle}>
        <h1>{props.name}</h1>
        <span>{categoryIdToString(props.category)}</span>
      </div>
      <p css={descriptionStyle}>{props.description}</p>
    </div>
  );
};

export default Info;
