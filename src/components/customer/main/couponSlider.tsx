import React from "react";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import moment from "moment";

import { Colors, Texts } from "styles/common";
import Slider from "common/slider";
import MyCouponWithQR, { CouponType } from "customer/main/myCouponWithQR";
import { getUserSubs } from "pages/api/user";
import useLoginStore from "src/store/userLogin";

const wrapper = css`
  padding: 1.25rem 0 0 1.25rem;
  background-color: ${Colors.neutral10};
`;

const title = css`
  ${Texts.B2_14_B}
  margin-bottom:  0.75rem;
  color: ${Colors.neutral80};
`;

const CouponSlider = () => {
  const { isLogin } = useLoginStore();

  const { data } = useQuery("userSubs", getUserSubs, {
    refetchOnWindowFocus: false,
    enabled: isLogin,
    select: (res) =>
      res.map((el: any) => ({
        storeName: el.storeTitle,
        storeLocation: `${el.sigungu} ${el.bname1}`,
        couponName: el.subscribeName,
        qrImage: el.qrimageUrl,
        validDate: moment(el.expiredAt).add("9", "h").format("YYYY-MM-DD HH:mm:ss"),
        subscribeType: el.subscribeType,
        remainingCount: el.remainingCount,
        totalCount: el.totalCount,
      })) as CouponType[],
  });

  if (!data || !data.length) return null;

  return (
    <section css={wrapper}>
      <h3 css={title}>내 구독권</h3>
      <Slider padding="0 0 1.25rem 0" gap="0.75rem">
        {data &&
          data.map((el, idx) => <MyCouponWithQR key={`${el.couponName}${idx}`} coupon={el} />)}
      </Slider>
    </section>
  );
};

export default CouponSlider;
