import React from "react";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import axios from "axios";

import Layout from "common/layout";
import StoreThumbnailList from "common/storeThumbnail/List";
import Location from "common/filter/Location";
import Sort from "common/filter/Sort";
import Category from "customer/main/Category";
import CouponSlider from "customer/main/CouponSlider";
import useLoginStore from "src/store/login";
import { StoreData } from "pages/api/store";
import SearchBar from "common/input/Search";

const MOCK_MYCOUPON = [
  {
    storeName: "아이비카페",
    couponName: "아메리카노 주문시 사이즈업",
    useCount: "3/5",
    validDate: "2023-01-20~2023.02.20",
    storeLocation: "구로구 구로동",
    qrImage: "/images/dummy/Mob-QR.png",
  },
  {
    storeName: "정갈한솥",
    couponName: "아메리카노 주문시 사이즈",
    useCount: "3/5",
    validDate: "2023-01-20~2023.02.20",
    storeLocation: "구로구 구로동",
    qrImage: "/images/dummy/Mob-QR.png",
  },
  {
    storeName: "더본즈피자",
    couponName: "아메리카노 주문시 사이즈",
    useCount: "3/5",
    validDate: "2023-01-20~2023.02.20",
    storeLocation: "구로구 구로동",
    qrImage: "/images/dummy/Mob-QR.png",
  },
];

const searchBar = css`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
  padding: 0 1.25rem;
`;

const location = css`
  margin-bottom: 1rem;
  padding: 1.25rem 1.25rem 0 1.25rem;
`;

const category = css`
  padding: 0 1.25rem;
`;

const sort = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 0.875rem;
  padding: 0 1.25rem;
`;

const Home = () => {
  const { isLogin } = useLoginStore();

  const { data: storeData, isLoading } = useQuery("StoreData", () =>
    axios.get("/api/store").then((res) =>
      res.data.map((item: StoreData) => {
        let newObj: { [key: string]: any } = {};
        newObj["id"] = item.id;
        newObj["store"] = item.name;
        newObj["category"] = item.category;
        newObj["tags"] = item.subs[0].tags;
        newObj["shortAddress"] = item.location.shortAddress;
        newObj["img"] = item.images[0].src;
        return newObj;
      })
    )
  );

  // FIXME: 로그인 시에만 유저 데이터 가져오기
  const { data: userPick } = useQuery("UserData", () =>
    axios.get("/api/user").then((res) => res.data[0].pick)
  );

  return (
    <Layout title="단골손님">
      <div css={searchBar}>
        <SearchBar isCustomer placeholder="음식 이름, 구독권 이름 검색" />
      </div>
      {isLogin && <CouponSlider coupons={MOCK_MYCOUPON} />}
      <div css={location}>
        <Location />
      </div>
      <div css={category}>
        <Category />
      </div>
      <section css={sort}>
        <Sort />
      </section>
      <StoreThumbnailList contents={storeData} isLoading={isLoading} userPick={userPick} />
    </Layout>
  );
};

export default Home;
