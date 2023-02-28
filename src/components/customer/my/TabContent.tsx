import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import MyCoupon, { MyCouponProps } from "common/coupon/My";
import StoreThumbnail, { ThumbnailData } from "common/storeThumbnail";

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

const dummyPickStores = [
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

const TabContent = ({ selectedTab }: TabContentType) => {
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

  return selectedTab === 0 ? (
    <div css={couponWrapper}>
      {myCoupons?.map((coupon) => (
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
  ) : (
    <div css={myPickWrapper}>
      {myPick?.map((store) => (
        <StoreThumbnail key={store.id} content={store} isPick={true} />
      ))}
    </div>
  );
};

export default TabContent;
