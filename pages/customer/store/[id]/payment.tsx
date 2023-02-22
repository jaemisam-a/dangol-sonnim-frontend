import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import StoreCoupon from "common/coupon/Store";
import PaymentInfo from "customer/store/menu/payment/Info";
import PaymentMethod from "customer/store/menu/payment/Method";
import PaymentConsent from "customer/store/menu/payment/Consent";
import { Colors, Texts } from "styles/common";

export type selectedType = {
  id: string;
  name: string;
};
export type cashReceiptsType = { isPersonal: boolean; data: string; isUse: boolean };
export type transferType = {
  id: string;
  name: string;
  accountHolder: string;
  accountNumber: number;
};

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
  padding-bottom: 5rem;
`;

const buyButton = (isActive: boolean) => css`
  width: 100%;
  border-radius: 0.25rem;
  margin-top: 2rem;
  padding: 0.688rem 0;
  cursor: ${isActive ? "pointer" : "default"};
  color: ${isActive ? Colors.white : Colors.neutral50};
  background-color: ${isActive ? Colors.amber50 : Colors.neutral20};
  ${Texts.S3_18_M}
`;

const StorePayment = () => {
  const [selectMethod, setSelectMethod] = useState(1);
  const [cashReceipts, setCashReceipts] = useState<cashReceiptsType>({
    isPersonal: true,
    data: "",
    isUse: false,
  });
  const [selectedCard, setSelectedCard] = useState({ id: "", name: "" });
  const [selectedBank, setSelectedBank] = useState<transferType>({
    id: "",
    name: "",
    accountHolder: "",
    accountNumber: 0,
  });
  const [isConsent, setIsConsent] = useState(false);

  useEffect(() => {
    setSelectedCard({ id: "", name: "" });
    setSelectedBank({ id: "", name: "", accountHolder: "", accountNumber: 0 });
    setCashReceipts({ data: "", isPersonal: true, isUse: false });
  }, [selectMethod]);

  const buttonActive = (): boolean => {
    const completeCashReceipts = cashReceipts.isUse ? cashReceipts.data : true;
    switch (selectMethod) {
      case 1:
        return Boolean(selectedCard.id) && isConsent;
      case 2:
        return (
          Boolean(selectedBank.id) &&
          Boolean(selectedBank.accountHolder) &&
          Boolean(selectedBank.accountNumber) &&
          Boolean(completeCashReceipts) &&
          isConsent
        );
      default:
        return isConsent;
    }
  };

  return (
    <Layout title="결제" subTitle="결제화면">
      <div css={couponWrapper}>
        <StoreCoupon
          count={DUMMY_PAYMENT.count}
          description={DUMMY_PAYMENT.description}
          name={DUMMY_PAYMENT.name}
          price={DUMMY_PAYMENT.price}
          storeName={DUMMY_PAYMENT.storeName}
          checked={true}
          disable={true}
        />
      </div>
      <PaymentInfo />
      <PaymentMethod
        selectMethod={selectMethod}
        setSelectMethod={setSelectMethod}
        cashReceipts={cashReceipts}
        setCashReceipts={setCashReceipts}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        selectedBank={selectedBank}
        setSelectedBank={setSelectedBank}
      />
      <PaymentConsent isConsent={isConsent} setIsConsent={setIsConsent} />
      <div css={buttonWrapper}>
        <button css={buyButton(buttonActive())}>
          {DUMMY_PAYMENT.price.toLocaleString("ko-KR")}원 결제하기
        </button>
      </div>
    </Layout>
  );
};

export default StorePayment;
