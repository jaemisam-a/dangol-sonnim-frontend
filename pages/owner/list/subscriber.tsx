import React, { useState } from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import Info from "customer/my/info";
import Check from "public/icons/check/check.svg";
import { Colors, Texts } from "styles/common";
import SubscriberSection from "owner/list/section";

const visitButton = (isVisited: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.5rem;
  background-color: #f8f8f8;
  color: ${isVisited ? Colors.neutral50 : Colors.amber50};
  ${Texts.B3_15_M2}
`;

const Subscriber = () => {
  const DUMMY_DATA = [
    { title: "현재 구독중인 상품", contents: "(월간) 모든 메뉴 사이즈업", isTitleBold: true },
    { title: "구독 기간", contents: "2022.09.01~2023.02.01", isTitleBold: false },
    { title: "전화번호", contents: "010-8888-8888", isTitleBold: false },
    {
      title: "방문일자(16회)",
      contents:
        "2023.01.01 / 16:40\n2023.01.01 / 16:40\n2023.01.01 / 16:40\n2023.01.01 / 16:40\n2023.01.01 / 16:40\n2023.01.01 / 16:40\n2023.01.01 / 16:40\n2023.01.01 / 16:40\n2023.01.01 / 16:40",
      isTitleBold: false,
    },
  ];

  const [isVisited, setIsVisited] = useState(false);

  return (
    <Layout title="구독자 정보" subTitle="구독자 정보" isXButton={true}>
      <Info user={{ loginInfo: "kakao", nickname: "물고기 1234", avatar: "/images/profile.png" }} />
      <button css={visitButton(isVisited)} onClick={() => setIsVisited((prev) => !prev)}>
        <Check width={24} height={24} fill={isVisited ? Colors.neutral50 : Colors.amber50} />
        {isVisited ? "금일 방문 취소" : "금일 방문 등록"}
      </button>
      {DUMMY_DATA.map((el) => (
        <SubscriberSection
          key={el.title}
          isTitleBold={el.isTitleBold}
          title={el.title}
          contents={el.contents}
        />
      ))}
    </Layout>
  );
};

export default Subscriber;
