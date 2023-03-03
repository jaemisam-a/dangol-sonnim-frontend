import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Layout from "common/layout";
import MyCoupon from "common/coupon/My";
import PayHistory from "customer/my/PayHistory";
import PaymentStoreInfo from "customer/my/PaymentStoreInfo";

const thumbnailSection = css`
  padding: 1.5rem 0 1.25rem 1.25rem;
`;

const couponSection = css`
  padding: 1.25rem;
  background-color: ${Colors.neutral10};
`;

const couponWrapper = css`
  background-color: ${Colors.white};
`;

const historySection = css`
  padding: 1.5rem 1.25rem 2.188rem 1.25rem;

  & > p:first-child {
    margin-bottom: 1rem;
  }
`;

const title = css`
  margin-top: 0;
  margin-bottom: 0.5rem;
  ${Texts.B3_15_B}
`;

const Payment = () => {
  const dummyStoreInfo = {
    id: "abc",
    store: "정갈한솥",
    category: "한식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/pizza.png",
  };

  const dummyCouponInfo = {
    storeName: "정갈한솥",
    couponPrice: 3500,
    couponName: "모든 메뉴 사이즈업(5회권)",
    useCount: "4/5",
    couponDescription: "쿠폰 소지 시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번 당 최대 1번 가능",
  };

  const dummyHistory = {
    storeName: "정갈한솥",
    prevPayment: [
      {
        price: 3500,
        date: "2022.11.12",
        frequency: 1,
      },
      {
        price: 3500,
        date: "2022.12.12",
        frequency: 2,
      },
    ],
    nextPayment: {
      price: 3500,
      date: "2023.01.12",
      frequency: 3,
    },
  };

  return (
    <Layout title="결제내역" subTitle="결제내역">
      <section css={thumbnailSection}>
        <PaymentStoreInfo content={dummyStoreInfo} />
      </section>
      <section css={couponSection}>
        <h2 css={title}>구독 쿠폰 정보</h2>
        <div css={couponWrapper}>
          <MyCoupon
            storeName={dummyCouponInfo.storeName}
            couponPrice={dummyCouponInfo.couponPrice}
            couponName={dummyCouponInfo.couponName}
            useCount={dummyCouponInfo.useCount}
            couponDescription={dummyCouponInfo.couponDescription}
            isDetail={false}
          />
        </div>
      </section>
      <section css={historySection}>
        <h2 css={title}>결제 내역</h2>
        <PayHistory
          storeName={dummyHistory.storeName}
          prevPayment={dummyHistory.prevPayment}
          nextPayment={dummyHistory.nextPayment}
        />
      </section>
    </Layout>
  );
};

export default Payment;
