import { useState } from "react";
import styled from "@emotion/styled";

import { Texts, Colors } from "styles/common";
import Banner from "customer/components/Banner";
import BottomSheet from "customer/components/common/bottomsheet";
import Layout from "customer/components/common/layout";
import MainCoupon from "customer/components/coupon/Main";
import StoreThumbnail from "customer/components/common/StoreThumbnail";
import MyCoupon from "customer/components/coupon/My";
import SearchBar from "customer/components/search/SearchBar";

const Test = () => {
  const dummy = {
    id: "abc",
    store: "더본즈피자",
    category: "양식",
    tags: ["사이드 디쉬 추가", "사이즈업"],
    location: "구로구 가리봉동",
    img: "/images/dummy/pizza.png",
  };

  const TestDiv = styled.div`
    ${Texts.B2_14_R_line}
    color: ${Colors.amber50};
  `;

  const [open, setOpen] = useState(false);

  return (
    <Layout title="테스트 페이지">
      <br />
      <SearchBar />
      <br />
      <StoreThumbnail content={dummy} isLarge={true} />
      <StoreThumbnail content={dummy} isLarge={false} />
      <br />
      <TestDiv onClick={() => setOpen(true)}>안녕하세요</TestDiv>
      <Banner
        images={[
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
        ]}
      />
      <BottomSheet
        open={open}
        setOpen={setOpen}
        title="테스트"
        isBackButton={false}
        isXButton={true}
        height="300px"
        component={<div>바텀시트 테스트</div>}
      />
      <MainCoupon
        couponName="아메리카노 주문 시 사이즈업"
        qrImage="/images/dummy/Mob-QR.png"
        storeLocation="구로구 구로동"
        storeName="메이비카페"
        useCount="4/5"
        validDate="2023.01.20~2023.02.20"
      />
      <br />
      <MyCoupon
        storeName="정갈한솥"
        couponPrice={3500}
        couponName="모든 메뉴 사이즈업(5회권)"
        useCount="4/5"
        couponDescription="쿠폰 소지 시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번 당 최대 1번 가능"
        isDetail={true}
      />
    </Layout>
  );
};

export default Test;
