import React from "react";
import { css } from "@emotion/react";

import CountTag from "customer/components/common/CountTag";
import RightIcon from "public/icons/RightIcon.svg";
import { Colors, Texts } from "styles/common";

type MyCouponProps = {
  storeName: string;
  couponPrice: number;
  couponName: string;
  useCount: string;
  couponDescription: string;
};

const wrapper = css`
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 0.5rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
`;

const storeName = css`
  color: ${Colors.neutral90};
  ${Texts.B1_13_R2}
`;

const paymentBtn = css`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  cursor: pointer;
  color: ${Colors.amber50};
  ${Texts.B1_13_M1}
`;

const couponPrice = css`
  ${Texts.B3_15_M1}
`;

const couponName = css`
  ${Texts.S1_16_B}
`;

const couponDescription = css`
  color: ${Colors.neutral70};
  ${Texts.C2_12_R}
`;

const couponExplainWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const titleWrapper = css`
  display: flex;
  gap: 0.25rem;
`;

const MyCoupon = (props: MyCouponProps) => {
  return (
    <>
      <div css={wrapper}>
        <div css={titleWrapper}>
          <span css={storeName}>{props.storeName}</span>
          <span css={paymentBtn}>
            <span>결제내역</span>
            <RightIcon width="14" height="14" stroke={Colors.amber50} />
          </span>
        </div>
        <div css={couponPrice}>월 {props.couponPrice.toLocaleString("ko-KR")}원</div>
        <div css={couponExplainWrapper}>
          <div css={couponName}>{props.couponName}</div>
          <CountTag useCount={props.useCount} />
          <div css={couponDescription}>{props.couponDescription}</div>
        </div>
      </div>
    </>
  );
};

export default MyCoupon;
