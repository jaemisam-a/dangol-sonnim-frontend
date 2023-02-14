import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type StoreCouponProps = {
  name: string;
  storeName: string;
  count: number;
  description: string;
  price: number;
};

const wrapper = css`
  display: flex;
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 8px;
  padding: 0.375rem 0.75rem;
  gap: 0.5rem;
  align-items: center;
`;

const inputWrapper = css`
  & input {
    display: none;
  }

  & label {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    display: inline-block;
    border-radius: 2px;
    border: 1px solid ${Colors.neutral60};
    background: url("/icons/CheckGrey.svg") center center no-repeat;
  }

  & input:checked + label {
    border: none;
    background: url("/icons/Check.svg") center center no-repeat ${Colors.amber50};
  }
`;

const contentsWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const contentsTopWrapper = css`
  height: 4.875rem;
`;

const storeName = css`
  color: ${Colors.neutral90};
  ${Texts.B1_13_R2}
`;

const subsName = css`
  color: ${Colors.amber50};
  ${Texts.S1_16_B}
`;

const description = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${Colors.neutral70};
  ${Texts.C2_12_R}
`;

const price = css`
  text-align: end;
  ${Texts.B3_15_M1}
`;

const StoreCoupon = (props: StoreCouponProps) => {
  return (
    <>
      <div css={wrapper}>
        <div css={inputWrapper}>
          <input type="checkbox" id={props.name} />
          <label htmlFor={props.name} />
        </div>
        <div css={contentsWrapper}>
          <div css={contentsTopWrapper}>
            <div css={storeName}>{props.storeName}</div>
            <div css={subsName}>
              {props.name}({props.count}회권)
            </div>
            <div css={description}>{props.description}</div>
          </div>
          <div css={price}>월 {props.price.toLocaleString("ko-KR")}원</div>
        </div>
      </div>
    </>
  );
};

export default StoreCoupon;
