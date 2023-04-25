import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Layout from "common/layout";
import StoreCoupon from "common/coupon/store";
import Consent from "common/consent";
import PaymentInfo from "customer/store/menu/payment/info";
import PaymentMethod from "customer/store/menu/payment/method";
import { Colors, Texts } from "styles/common";

export type SelectedType = {
  id: string;
  name: string;
};
export type CashReceiptsType = { isPersonal: boolean; data: string; isUse: boolean };
export type TransferType = {
  id: string;
  name: string;
  accountHolder: string;
  accountNumber: string;
};

const DUMMY_PAYMENT = {
  id: 1,
  storeName: "정갈한솥",
  count: 5,
  name: "모든 메뉴 사이즈업",
  description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번.",
  price: 3500,
};

const couponWrapper = css`
  padding: 0.75rem 1.25rem 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  const { push, asPath, query, isReady } = useRouter();

  const [selectMethod, setSelectMethod] = useState(1);
  const [cashReceipts, setCashReceipts] = useState<CashReceiptsType>({
    isPersonal: true,
    data: "",
    isUse: false,
  });
  const [selectedCard, setSelectedCard] = useState({ id: "", name: "" });
  const [selectedBank, setSelectedBank] = useState<TransferType>({
    id: "",
    name: "",
    accountHolder: "",
    accountNumber: "",
  });
  const [isConsent, setIsConsent] = useState(false);

  useEffect(() => {
    setSelectedCard({ id: "", name: "" });
    setSelectedBank({ id: "", name: "", accountHolder: "", accountNumber: "" });
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

  useEffect(() => {
    if (!isReady) return;
    if (!query.selectedSubs) push(`/store/${query.id}`);
  }, [isReady]);

  return (
    <Layout title="결제" subTitle="결제화면">
      <div css={couponWrapper}>
        {/* FIXME: 선택한 구독권 id에 맞는 api 요청 */}
        {query.selectedSubs &&
          (JSON.parse(query.selectedSubs as string) as string[]).map((subs) => (
            <StoreCoupon
              id={DUMMY_PAYMENT.id}
              count={DUMMY_PAYMENT.count}
              description={DUMMY_PAYMENT.description}
              name={DUMMY_PAYMENT.name}
              price={DUMMY_PAYMENT.price}
              storeName={DUMMY_PAYMENT.storeName}
              checked={true}
              disable={true}
              key={subs}
            />
          ))}
      </div>
      <PaymentInfo price={DUMMY_PAYMENT.price} />
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
      <Consent
        isConsent={isConsent}
        setIsConsent={setIsConsent}
        storeName={DUMMY_PAYMENT.storeName}
        consentArr={[
          { content: "구독취소 등 환불 안내 확인 및 동의 (필수)", termsType: "refund" },
          { content: "개인정보 수집 및 이용 동의 (필수)", termsType: "privacy" },
          { content: "개인정보 제3자 제공 동의 (필수)", termsType: "privacyThirdParties" },
          { content: "결제대행 서비스 이용 약관 동의 (필수) 토스페이먼츠", termsType: "payment" },
        ]}
      />
      <div css={buttonWrapper}>
        <button
          css={buyButton(buttonActive())}
          disabled={!buttonActive()}
          onClick={() =>
            push(
              {
                pathname: `${asPath}/complete`,
                query: { price: DUMMY_PAYMENT.price },
              },
              `${asPath}/complete`
            )
          }
        >
          {DUMMY_PAYMENT.price.toLocaleString("ko-KR")}원 결제하기
        </button>
      </div>
    </Layout>
  );
};
export default StorePayment;
