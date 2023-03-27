import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type SubscriberSectionProps = {
  title: string;
  contents: string;
  isTitleBold: boolean;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.25rem 1.125rem 1.25rem;
  border-bottom: 2px solid ${Colors.neutral10};
`;

const title = css`
  color: ${Colors.neutral80};
  ${Texts.B3_15_M2}
`;

const contents = (isTitleBold: boolean) => css`
  color: ${isTitleBold ? Colors.amber50 : Colors.black};
  white-space: pre-wrap;
  ${isTitleBold ? Texts.S1_16_B : Texts.B3_15_M1}
`;

const SubscriberSection = (props: SubscriberSectionProps) => {
  return (
    <div css={wrapper}>
      <h2 css={title}>{props.title}</h2>
      <div css={contents(props.isTitleBold)}>{props.contents}</div>
    </div>
  );
};

export default SubscriberSection;
