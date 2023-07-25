import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import moment from "moment";

import MyCoupon from "common/coupon/my";
import StoreThumbnail, { ThumbnailData } from "common/storeThumbnail";
import { Colors, Texts } from "styles/common";
import { getLikeList } from "pages/api/user/storeLike";
import { getUserSubs } from "pages/api/user";
import { CouponType } from "customer/main/myCouponWithQR";

type TabContentType = {
  selectedTab: number;
};

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

  const { data, refetch } = useQuery("getLikeList", getLikeList, {
    enabled: false,
  });
  const { data: userSubs } = useQuery("userSubs", getUserSubs, {
    refetchOnWindowFocus: false,
    select: (res) =>
      res.map((el: any) => ({
        storeName: el.storeTitle,
        storeLocation: `${el.sigungu} ${el.bname1}`,
        couponName: el.subscribeName,
        qrImage: el.qrimageUrl,
        validDate: moment(el.expiredAt).add("9", "h").format("YYYY-MM-DD HH:mm:ss"),
        subscribeType: el.subscribeType,
        remainingCount: el.remainingCount >= 0 ? el.remainingCount : 0,
        totalCount: el.totalCount,
        couponPrice: el.price,
        couponDescription: el.intro,
        id: el.purchasedSubscribeId,
      })) as ({ id: number; couponPrice: number; couponDescription: string } & CouponType)[],
  });

  useEffect(() => {
    if (selectedTab === 1) refetch();
  }, [selectedTab]);

  if (selectedTab === 0) {
    if (userSubs && userSubs.length)
      return (
        <div css={couponWrapper}>
          {userSubs.map((coupon) => (
            <MyCoupon
              key={coupon.id}
              couponName={coupon.couponName}
              couponPrice={coupon.couponPrice || 0}
              couponDescription={coupon.couponDescription}
              storeName={coupon.storeName}
              isDetail={false}
              subscribeType={coupon.subscribeType}
              useCount={`${coupon.remainingCount}/${coupon.totalCount}`}
            />
          ))}
        </div>
      );
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
    if (data?.length) {
      return (
        <div css={myPickWrapper}>
          {data.map((store: ThumbnailData) => (
            <StoreThumbnail key={store.id} content={store} />
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
