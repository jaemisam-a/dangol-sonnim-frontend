import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import MyCoupon, { MyCouponProps } from "common/coupon/my";
import StoreThumbnail, { ThumbnailData } from "common/storeThumbnail";
import { Colors, Texts } from "styles/common";

type TabContentType = {
  selectedTab: number;
};

const dummyMyCoupon = [
  {
    storeName: "정갈한솥",
    couponPrice: 3500,
    couponName: "모든 메뉴 사이즈업(5회권)",
    useCount: "4/5",
    couponDescription: "쿠폰 소지 시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번 당 최대 1번 가능",
    isDetail: true,
  },
  {
    storeName: "마라향",
    couponPrice: 5500,
    couponName: "양고기 추가(5회권)",
    useCount: "4/5",
    couponDescription: "쿠폰 소지시 최대 5회까지 양고기추가 가능. 방문 1번당 최대 1번.",
    isDetail: true,
  },
];

const dummyPickStores: any = [
  {
    id: "abc",
    store: "정갈한솥",
    category: "한식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/pizza.png",
  },
  {
    id: "cdf",
    store: "정갈한솥",
    category: "한식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
  {
    id: "asdsd",
    store: "정갈한솥",
    category: "한식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/pizza.png",
  },
  {
    id: "cdsddf",
    store: "정갈한솥",
    category: "한식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    shortAddress: "구로구 구로동",
    img: "/images/dummy/cheetah.jpg",
  },
];

const couponWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
  padding: 1rem 1.25rem;
`;

const myPickWrapper = css`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
  padding: 1rem 1.25rem;
`;

const emptyState = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  margin-top: 8.5rem;
  text-align: center;
  ${Texts.S1_16_M}

  button {
    color: ${Colors.white};
    background-color: ${Colors.amber50};
    ${Texts.B3_15_M2}
    border-radius:0.25rem;
    padding: 0.563rem 0.75rem;
  }
`;

const TabContent = ({ selectedTab }: TabContentType) => {
  const { push } = useRouter();

  const [myCoupons, setMyCoupons] = useState<MyCouponProps[] | null>();
  const [myPick, setMyPick] = useState<ThumbnailData[] | null>(null);

  useEffect(() => {
    if (selectedTab === 0) {
      //TODO: my coupon api 요청
      setMyCoupons(dummyMyCoupon);
    } else if (selectedTab === 1) {
      //TODO: my pick api 요청
      setMyPick(dummyPickStores);
    }
  }, [selectedTab]);

  if (selectedTab === 0) {
    if (myCoupons) {
      return (
        <div css={couponWrapper}>
          {myCoupons.map((coupon) => (
            <MyCoupon
              key={coupon.storeName}
              couponName={coupon.couponName}
              couponPrice={coupon.couponPrice}
              couponDescription={coupon.couponDescription}
              storeName={coupon.storeName}
              isDetail={coupon.isDetail}
              useCount={coupon.useCount}
            />
          ))}
        </div>
      );
    }
    return (
      <div css={emptyState}>
        <p>
          아직 구독한 쿠폰이 없어요
          <br />
          다양한 구독 혜택을 누려보세요!
        </p>
        <button onClick={() => push("/")}>가게 보러가기</button>
      </div>
    );
  } else {
    if (myPick) {
      return (
        <div css={myPickWrapper}>
          {myPick.map((store) => (
            <StoreThumbnail key={store.id} content={store} isPick={true} />
          ))}
        </div>
      );
    }
    return (
      <div css={emptyState}>
        <p>
          아직 좋아요 누른 가게가 없어요
          <br />
          관심있는 가게에 ♡를 눌러보세요!
        </p>
        <button onClick={() => push("/")}>가게 보러가기</button>
      </div>
    );
  }
};

export default TabContent;
