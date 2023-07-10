import React from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import CountTag from "common/countTag";
import RightIcon from "public/icons/direction/right.svg";
import { Colors, Texts } from "styles/common";

export type MyCouponProps = {
  storeName: string;
  couponPrice: number;
  couponName: string;
  useCount: string;
  couponDescription: string;
  isDetail: boolean;
  subscribeType: "COUNT" | "MONTHLY";
};

const wrapper = css`
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
`;

const storeName = css`
  color: ${Colors.neutral90};
  ${Texts.B1_13_R2}
`;

const paymentHistory = css`
  display: flex;
  align-items: center;
  gap: 0.125rem;
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
  const router = useRouter();

  return (
    <>
      <div css={wrapper}>
        <div css={titleWrapper}>
          <span css={storeName}>{props.storeName}</span>
          {props.isDetail && (
            <button css={paymentHistory} onClick={() => router.push("/my/payment")}>
              <span>결제내역</span>
              <RightIcon width="14" height="14" stroke={Colors.amber50} />
            </button>
          )}
        </div>
        <div css={couponPrice}>월 {props.couponPrice.toLocaleString("ko-KR")}원</div>
        <div css={couponExplainWrapper}>
          <div css={couponName}>{props.couponName}</div>
          {/* FIXME: 임시로 COUNT로만 설정 */}
          <CountTag subsribeType={props.subscribeType} useCount={props.useCount} />
          <div css={couponDescription}>{props.couponDescription}</div>
        </div>
      </div>
    </>
  );
};

export default MyCoupon;
