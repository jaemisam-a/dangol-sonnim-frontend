import React, { useState } from "react";
import { css } from "@emotion/react";

import Layout from "customer/components/common/layout";
import StoreCoupon from "customer/components/coupon/Store";
import PaymentInfo from "customer/components/store/payment/Info";
import PaymentMethod from "customer/components/store/payment/Method";
import PaymentConsent from "customer/components/store/payment/Consent";
import { Colors, Texts } from "styles/common";

export type selectedType = {
  id: string;
  name: string;
};

export type cashReceiptsType = null | { isPersonal: boolean; data: string; isUse: boolean };

const DUMMY_PAYMENT = {
  storeName: "정갈한솥",
  count: 5,
  name: "모든 메뉴 사이즈업",
  description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번.",
  price: 3500,
};

const couponWrapper = css`
  padding: 0.75rem 1.25rem 0 1.25rem;
`;

const buttonWrapper = css`
  padding: 0 1.25rem;
`;

const buyButton = css`
  width: 100%;
  border-radius: 0.25rem;
  margin-top: 2rem;
  padding: 0.688rem 0;
  color: ${Colors.white};
  background-color: ${Colors.amber50};
  ${Texts.S3_18_M}
`;

const StorePayment = () => {
  const [selectMethod, setSelectMethod] = useState(1);
  const [cashReceipts, SetCashReceipts] = useState<cashReceiptsType>(null);
  const [selectedCard, setSelectedCard] = useState({ id: "", name: "" });
  const [selectedBank, setSelectedBank] = useState({ id: "", name: "" });
  const [isConsent, setIsConsent] = useState(false);

  return (
    <Layout title="결제" subTitle="결제화면">
      <div css={couponWrapper}>
        <StoreCoupon
          count={DUMMY_PAYMENT.count}
          description={DUMMY_PAYMENT.description}
          name={DUMMY_PAYMENT.name}
          price={DUMMY_PAYMENT.price}
          storeName={DUMMY_PAYMENT.storeName}
        />
      </div>
      <PaymentInfo />
      <PaymentMethod
        selectMethod={selectMethod}
        setSelectMethod={setSelectMethod}
        cashReceipts={cashReceipts}
        setCashReceipts={SetCashReceipts}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        selectedBank={selectedBank}
        setSelectedBank={setSelectedBank}
      />
      <PaymentConsent isConsent={isConsent} setIsConsent={setIsConsent} />
      <div css={buttonWrapper}>
        <button css={buyButton}>{DUMMY_PAYMENT.price.toLocaleString("ko-KR")}원 결제하기</button>
      </div>
    </Layout>
  );
};

export default StorePayment;
