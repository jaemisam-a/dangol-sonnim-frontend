import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Check from "public/icons/Check.svg";

const useCount = css`
  border: 1px solid ${Colors.amber50};
  border-radius: 7.5rem;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 0.375rem;
`;

const useCountText = css`
  ${Texts.C2_12_M};
  color: ${Colors.amber50};
`;

const CountTag = (props: { useCount: string }) => {
  return (
    <>
      <div css={useCount}>
        <Check width="12" height="12" fill={Colors.amber50} />
        <span css={useCountText}>{props.useCount}회 사용</span>
      </div>
    </>
  );
};

export default CountTag;
