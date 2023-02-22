import React from "react";
import { css } from "@emotion/react";

import StoreSection from "customer/store/Section";
import { Texts } from "styles/common";

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1px;
  ${Texts.B2_14_R2}
`;

const nowPay = css`
  ${Texts.B2_14_M}
`;

const PaymentInfo = () => {
  return (
    <>
      <StoreSection sectionTitle="구매 정보 확인" fold={false}>
        <div css={wrapper}>
          <div>
            <span>결제방식: </span>
            <span>월간 정기결제</span>
          </div>
          <div>
            <span>상품가: </span>
            <span>3500원</span>
          </div>
          <div css={nowPay}>
            <span>이번 결제금액: </span>
            <span>3500원</span>
          </div>
        </div>
      </StoreSection>
    </>
  );
};

export default PaymentInfo;
