import React from "react";
import { css } from "@emotion/react";

import StoreCoupon from "customer/components/coupon/Store";
import StoreSection from "customer/components/store/Section";
import { Colors, Texts } from "styles/common";

type SubsProps = {
  storeName: string;
};

const subsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const buyButton = css`
  width: 100%;
  border-radius: 0.25rem;
  margin-top: 0.75rem;
  padding: 0.688rem 0;
  color: ${Colors.white};
  background-color: ${Colors.amber50};
  ${Texts.S3_18_M}
`;

const Subs = (props: SubsProps) => {
  const subsArr = [
    {
      name: "모든 메뉴 사이즈업",
      count: 5,
      description:
        "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번 / 쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번 / 쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
      price: 3500,
    },
    {
      name: "계란 추가 or 새우튀김 제공",
      count: 5,
      description: "쿠폰 소지시 최대 5회까지 가능. 방문 1번당 최대 1번",
      price: 3500,
    },
  ];

  return (
    <>
      <StoreSection sectionTitle="구독권">
        <div css={subsWrapper}>
          {subsArr.map((el) => (
            <StoreCoupon
              name={el.name}
              count={el.count}
              description={el.description}
              price={el.price}
              storeName={props.storeName}
              key={el.name}
            />
          ))}
        </div>
        <button css={buyButton}>구독권 구매하기</button>
      </StoreSection>
    </>
  );
};

export default Subs;
