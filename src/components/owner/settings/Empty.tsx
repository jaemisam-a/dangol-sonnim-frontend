import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type EmptyProps = {
  description: string;
  backgroundColor: string;
  isTop: boolean;
};

const wrapper = (backgroundColor: string, isTop: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${isTop ? "1.875rem" : "1.5rem"} 0;
  background-color: ${backgroundColor};
  gap: 1rem;

  div {
    text-align: center;
    white-space: pre-wrap;
    color: ${Colors.neutral60};
    ${Texts.B2_14_M}
  }
`;

const Empty = (props: EmptyProps) => {
  return (
    <div css={wrapper(props.backgroundColor, props.isTop)}>
      <Image src="/images/logo/GreyLogo.png" alt="로고" width={27} height={36} />
      <div>{props.description}</div>
    </div>
  );
};

export default Empty;
