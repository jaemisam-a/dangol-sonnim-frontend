import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

import Layout from "common/layout";
import StoreCoupon from "common/coupon/store";
import Consent from "common/consent";
import FullPageSpinner from "common/spinner/fullPage";
import PaymentInfo from "customer/store/menu/payment/info";
import PaymentMethod from "customer/store/menu/payment/method";
import { Colors, Texts } from "styles/common";
import { getSubs } from "pages/api/subs";
import { purchaseSubs } from "pages/api/user/payment";
import { getOrderNumber } from "src/utils/getOrderNumber";

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
declare const window: typeof globalThis & { IMP: any };

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

  const { data } = useQuery(
    "subs",
    () => getSubs({ subscribeId: Number(JSON.parse(query.selectedSubs as string)[0]) }),
    {
      enabled: Boolean(query.selectedSubs),
    },
  );
  const { mutateAsync } = useMutation(purchaseSubs);

  const [selectMethod, setSelectMethod] = useState(1);
  const [cashReceipts, setCashReceipts] = useState<CashReceiptsType>({
    isPersonal: true,
    data: "",
    isUse: false,
  });
  const [selectedBank, setSelectedBank] = useState<TransferType>({
    id: "",
    name: "",
    accountHolder: "",
    accountNumber: "",
  });
  const [isConsent, setIsConsent] = useState(false);

  const handlePayment = () => {
    const paymentMethod =
      selectMethod === 1
        ? process.env.NEXT_PUBLIC_PG_KCP
        : selectMethod === 3
        ? process.env.NEXT_PUBLIC_PG_KAKAOPAY
        : selectMethod == 4 && process.env.NEXT_PUBLIC_PG_TOSSPAY;
    window.IMP.request_pay(
      {
        pg: paymentMethod,
        pay_method: "card",
        merchant_uid: getOrderNumber(),
        name: data.name,
        amount: data.price,
        // TODO: 계정정보 적용하여 입력
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
      },
      (rsp: any) => {
        if (rsp.success) {
          mutateAsync({
            merchantUid: rsp.merchant_uid,
            subscribeId: data?.subscribeId,
            subscribeType: data.type,
          });
          push(
            {
              pathname: `${asPath}/complete`,
              query: { price: data.price },
            },
            `${asPath}/complete`,
          );
        } else alert("결제에 실패하였습니다. 다시 시도해주세요.");
      },
    );
  };

  useEffect(() => {
    setSelectedBank({ id: "", name: "", accountHolder: "", accountNumber: "" });
    setCashReceipts({ data: "", isPersonal: true, isUse: false });
  }, [selectMethod]);

  const buttonActive = (): boolean => {
    const completeCashReceipts = cashReceipts.isUse ? cashReceipts.data : true;
    switch (selectMethod) {
      case 1:
        return isConsent;
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
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;

    const handleScriptLoad = () => {
      window.IMP?.init(process.env.NEXT_PUBLIC_PG_IMP_CODE);
    };

    script.addEventListener("load", handleScriptLoad);

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (!query.selectedSubs) push(`/store/${query.id}`);
  }, [isReady]);

  return (
    <Layout title="결제" subTitle="결제화면">
      {!data ? (
        <FullPageSpinner />
      ) : (
        <>
          <div css={couponWrapper}>
            {query.selectedSubs &&
              (JSON.parse(query.selectedSubs as string) as string[]).map((subs) => (
                <StoreCoupon
                  type={data.type}
                  id={data.subscribeId}
                  count={data.useCount}
                  description={data.intro}
                  name={data.name}
                  price={data.price}
                  storeName={data.storeName}
                  checked={true}
                  disable={true}
                  key={subs}
                />
              ))}
          </div>
          <PaymentInfo price={data?.price} />
          <PaymentMethod
            selectMethod={selectMethod}
            setSelectMethod={setSelectMethod}
            cashReceipts={cashReceipts}
            setCashReceipts={setCashReceipts}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
          />
          <Consent
            isConsent={isConsent}
            setIsConsent={setIsConsent}
            storeName={data.storeName}
            consentArr={[
              { content: "구독취소 등 환불 안내 확인 및 동의 (필수)", termsType: "refund" },
              { content: "개인정보 수집 및 이용 동의 (필수)", termsType: "privacy" },
              { content: "개인정보 제3자 제공 동의 (필수)", termsType: "privacyThirdParties" },
              {
                content: "결제대행 서비스 이용 약관 동의 (필수) 토스페이먼츠",
                termsType: "payment",
              },
            ]}
          />
          <div css={buttonWrapper}>
            <button
              css={buyButton(buttonActive())}
              disabled={!buttonActive()}
              onClick={handlePayment}
            >
              {data.price.toLocaleString("ko-KR")}원 결제하기
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};
export default StorePayment;
