import React, { useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import Search from "public/icons/etc/search.svg";
import { Colors, Texts } from "styles/common";
import CountTag from "common/countTag";
import BottomSheet from "common/bottomSheet";
import QRCheck from "customer/main/qrCheck";

export type CouponType = {
  qrImage: string;
  storeName: string;
  storeLocation: string;
  couponName: string;
  validDate: string;
  subscribeType: "MONTHLY" | "COUNT";
  remainingCount: number;
  totalCount: number;
};

type MainCouponPropsType = { coupon: CouponType };

const wrapper = css`
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 0.5rem;
  display: flex;
  width: fit-content;
  padding: 0.75rem;
  background-color: ${Colors.white};
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

const validDate = css`
  ${Texts.B1_13_R2};
  color: ${Colors.neutral70};
`;

const BottomSheetWrapper = css`
  cursor: default;
`;

const MyCouponWithQR = (props: MainCouponPropsType) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div css={wrapper}>
        <div css={qrWrapper}>
          <Image src={props.coupon.qrImage} alt="qr" width="74" height="74" />
          <button css={qrButton} onClick={() => setOpen(true)}>
            <Search stroke={Colors.neutral90} width={14} height={14} />
            <span css={qrButtonText}>QR 확대</span>
          </button>
        </div>
        <div css={contentsWrapper}>
          <div css={storeWrapper}>
            <span css={storeName}>{props.coupon.storeName}</span>
            <span css={storeLocation}>{props.coupon.storeLocation}</span>
          </div>
          <div css={couponName}>{props.coupon.couponName}</div>
          <CountTag
            subsribeType={props.coupon.subscribeType}
            useCount={`${props.coupon.remainingCount}/${props.coupon.totalCount}`}
          />
          <div css={validDate}>{props.coupon.validDate}</div>
          <div css={BottomSheetWrapper}>
            <BottomSheet
              component={
                <QRCheck
                  qrImg={props.coupon.qrImage}
                  storeName={props.coupon.storeName}
                  subscribeType={props.coupon.subscribeType}
                  useCount={`${props.coupon.remainingCount}/${props.coupon.totalCount}`}
                />
              }
              height={"42.25rem"}
              isXButton={true}
              isBackButton={false}
              open={open}
              setOpen={setOpen}
              title="QR 인증"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCouponWithQR;
