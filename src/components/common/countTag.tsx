import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Check from "public/icons/check/check.svg";

type CountTagProps = {
  useCount: string;
  subsribeType: "COUNT" | "MONTHLY";
  prefix?: string;
};

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

const CountTag = (props: CountTagProps) => {
  return (
    <>
      <div css={useCount}>
        <Check width="12" height="12" fill={Colors.amber50} />
        <span css={useCountText}>
          {props.subsribeType === "COUNT" ? (
            <>
              {props.prefix && props.prefix}&nbsp;
              {props.useCount}회 사용가능
            </>
          ) : (
            <div>횟수 제한 없음</div>
          )}
        </span>
      </div>
    </>
  );
};

export default CountTag;
