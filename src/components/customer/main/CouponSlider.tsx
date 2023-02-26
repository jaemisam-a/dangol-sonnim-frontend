import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Slider from "common/Slider";
import MyCouponWithQR, { MainCouponProps } from "customer/main/MyCouponWithQR";

type CouponSliderProps = {
  coupons: MainCouponProps[];
};

const wrapper = css`
  padding: 1.25rem 0 0 1.25rem;
  background-color: ${Colors.neutral10};
`;

const title = css`
  ${Texts.B2_14_B}
  margin-bottom:  0.75rem;
  color: ${Colors.neutral80};
`;

const CouponSlider = ({ coupons }: CouponSliderProps) => {
  return (
    <section css={wrapper}>
      <h3 css={title}>내 구독권</h3>
      <Slider padding={"0 0 1.25rem 0"}>
        {coupons.map(
          ({ storeName, couponName, storeLocation, qrImage, useCount, validDate }, idx) => (
            <MyCouponWithQR
              key={`${couponName}${idx}`}
              storeName={storeName}
              couponName={couponName}
              storeLocation={storeLocation}
              qrImage={qrImage}
              useCount={useCount}
              validDate={validDate}
            />
          )
        )}
      </Slider>
    </section>
  );
};

export default CouponSlider;
