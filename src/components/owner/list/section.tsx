import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type SubscriberSectionProps = {
  title: string;
  contents: string[];
  isContentsBold: boolean;
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

const contents = (isContentsBold: boolean) => css`
  display: flex;
  flex-direction: column;
  color: ${isContentsBold ? Colors.amber50 : Colors.black};
  white-space: pre-wrap;
  ${isContentsBold ? Texts.S1_16_B : Texts.B3_15_M1}
`;

const SubscriberSection = (props: SubscriberSectionProps) => {
  return (
    <div css={wrapper}>
      <h2 css={title}>{props.title}</h2>
      <div css={contents(props.isContentsBold)}>
        {props.contents.map((el) => (
          <span key={el}>{el}</span>
        ))}
      </div>
    </div>
  );
};

export default SubscriberSection;
