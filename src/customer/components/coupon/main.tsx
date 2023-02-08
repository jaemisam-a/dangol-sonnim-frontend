import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type MainCouponProps = {
  qrImage: string;
  storeName: string;
  storeLocation: string;
  couponName: string;
  useCount: string;
  validDate: string;
};

const wrapper = css`
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 0.5rem;
  display: flex;
  width: fit-content;
  padding: 0.75rem;
`;

const qrWrapper = css`
  display: flex;
  flex-direction: column;
`;

const qrButton = css`
  border: 1px solid ${Colors.neutral30};
  border-radius: 0.25rem;
  padding: 0.313rem 0.5rem;
  display: flex;
  align-items: center;
  background-color: transparent;
  margin-top: 0.125rem;
  cursor: pointer;
`;

const qrButtonText = css`
  ${Texts.B1_13_M2};
  color: ${Colors.neutral80};
`;

const contentsWrapper = css`
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const storeWrapper = css`
  display: flex;
  flex-direction: column;
`;

const storeName = css`
  ${Texts.B3_15_M1};
  color: #191919;
  width: 190px;
`;

const storeLocation = css`
  ${Texts.C2_12_R};
  color: ${Colors.neutral60};
`;

const couponName = css`
  ${Texts.B3_15_B}
  color: ${Colors.black};
`;

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

const validDate = css`
  ${Texts.B1_13_R2};
  color: ${Colors.neutral70};
`;

const MainCoupon = (props: MainCouponProps) => {
  return (
    <>
      <div css={wrapper}>
        <div css={qrWrapper}>
          <Image src={props.qrImage} alt="qr" width="74" height="74" />
          <button css={qrButton}>
            <Image src="/images/Enlarge.png" alt="enlargement" width="14" height="14" />
            <span css={qrButtonText}>QR 확대</span>
          </button>
        </div>
        <div css={contentsWrapper}>
          <div css={storeWrapper}>
            <span css={storeName}>{props.storeName}</span>
            <span css={storeLocation}>{props.storeLocation}</span>
          </div>
          <div css={couponName}>{props.couponName}</div>
          <div css={useCount}>
            <Image src="/images/Check.png" alt="check" width="16" height="16" />
            <span css={useCountText}>{props.useCount}회 사용</span>
          </div>
          <div css={validDate}>{props.validDate}</div>
        </div>
      </div>
    </>
  );
};

export default MainCoupon;
