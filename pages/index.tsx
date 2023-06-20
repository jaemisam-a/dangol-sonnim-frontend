import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import axios from "axios";

import Layout from "common/layout";
import StoreThumbnailList from "common/storeThumbnail/list";
import Location from "common/filter/location";
import Sort from "common/filter/sort";
import Category from "customer/main/category";
import CouponSlider from "customer/main/couponSlider";
import useLoginStore from "src/store/userLogin";
import SearchBar from "common/input/search";
import { GetStoreListType, getStoreList } from "pages/api/store";

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

  const [selected, setSelected] = useState("ALL");
  const [storeListParams, setStoreListParams] = useState<GetStoreListType>({
    sortBy: "likeNumber",
  });

  const {
    data: storeData,
    isFetching: isLoading,
    refetch,
  } = useQuery(["storeList", selected], () => getStoreList(storeListParams), {
    enabled: false,
  });

  // FIXME: 로그인 시에만 유저 데이터 가져오기
  const { data: userPick } = useQuery("UserData", () =>
    axios.get("/api/user").then((res) => res.data[0].pick)
  );

  useEffect(() => {
    if (selected !== "ALL") {
      setStoreListParams((prev) => ({ ...prev, category: selected }));
    } else {
      setStoreListParams((prev) => ({ ...prev, category: "" }));
    }
  }, [selected]);

  useEffect(() => {
    refetch();
  }, [storeListParams]);

  return (
    <Layout title="단골손님">
      <div css={searchBar}>
        <SearchBar isCustomer placeholder="가게 이름 검색" />
      </div>
      {isLogin && <CouponSlider coupons={MOCK_MYCOUPON} />}
      <div css={location}>
        <Location setStoreListParams={setStoreListParams} />
      </div>
      <div css={category}>
        <Category selected={selected} setSelected={setSelected} />
      </div>
      <section css={sort}>
        <Sort setStoreListParams={setStoreListParams} />
      </section>
      <StoreThumbnailList contents={storeData} isLoading={isLoading} userPick={userPick} />
    </Layout>
  );
};

export default Home;
