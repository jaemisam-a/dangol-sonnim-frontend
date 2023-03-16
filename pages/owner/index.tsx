import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { css } from "@emotion/react";

import Layout from "common/layout";
import { Colors, Texts } from "styles/common";
import Check from "public/icons/check/BannerCheck.svg";
import Chat from "public/icons/etc/Chat.svg";

const banner = css`
  background: no-repeat center url("/images/owner/banner.jpg");
  background-size: cover;
  padding: 4rem 0 2.75rem;
  color: ${Colors.white};
  text-align: center;

  h1 {
    font-family: "blackHanSans", -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 2.25rem;
    line-height: 2.813rem;
    font-weight: 400;
  }

  h1 span {
    padding-right: 2.188rem;
  }

  svg {
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1.75rem;
    padding: 0.75rem 2.5rem;
    border-radius: 0.25rem;
    background-color: ${Colors.amber50};
    color: ${Colors.white};
    ${Texts.S1_16_B}
  }
`;

const mainWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2.375rem;
  padding: 2.625rem 1.25rem 0;
  margin-bottom: 3.875rem;
  text-align: center;
  color: ${Colors.neutral90};
`;

const mainFirst = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  h2 {
    ${Texts.H2_21_B}
  }
  h3 {
    ${Texts.S1_16_R}
  }
`;

const mainOthers = css`
  background-color: #fffce4;
  padding: 1.25rem 0.688rem 0;
  border-radius: 0.625rem;

  h2 {
    ${Texts.B3_15_M2}
  }

  h3 {
    ${Texts.H2_21_B}
    margin-bottom: 1rem;
  }
`;

const chatStyle = css`
  padding: 0.75rem 1.75rem 0;
  margin-bottom: 4.125rem;

  button {
    display: flex;
    align-items: center;
    ${Texts.S3_18_M}
    margin: 0 auto;
    margin-top: 0.5rem;
    border: ${Colors.neutral30} solid 1px;
    border-radius: 0.25rem;
    padding: 0.688rem 2.594rem;
  }
`;

const Owner = () => {
  const { push } = useRouter();

  const mainOthersData = [
    {
      heading: "소식",
      desc: "내 가게를 알려보세요",
      imgSrc: "/images/owner/main2.png",
      alt: "소식 이미지",
    },
    {
      heading: "단골관리",
      desc: "내 가게만의 고객 리스트",
      imgSrc: "/images/owner/main2.png",
      alt: "소식 이미지",
    },
    {
      heading: "구독권",
      desc: "정기적인 구매를 부르는 찬스",
      imgSrc: "/images/owner/main2.png",
      alt: "소식 이미지",
    },
  ];

  return (
    <Layout title="단골손님 | 사장님" isLogo={true}>
      <section css={banner}>
        <h1>
          우리 동네 손님들을
          <br />
          <Check />
          한번에 끌어오고
          <span />
          <br />
          싶다면?
        </h1>
        <button onClick={() => push("/owner/login")}>지금 무료로 등록하기</button>
      </section>
      <section css={mainWrapper}>
        <div css={mainFirst}>
          <Image
            src="/images/owner/main1.png"
            alt="동네 이웃 이미지"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            sizes="100vw"
          />
          <div>
            <h2>동네 이웃을 내 고객으로</h2>
            <h3>
              가게 홍보부터 판매, 고객관리까지 단골손님에서
              <br />한 번에 해결해요.
            </h3>
          </div>
        </div>
        {mainOthersData.map((el) => (
          <div key={el.heading} css={mainOthers}>
            <h2>{el.heading}</h2>
            <h3>{el.desc}</h3>
            <Image
              src={el.imgSrc}
              alt={el.alt}
              width={0}
              height={0}
              style={{ width: "50%", height: "auto" }}
              sizes="50vw"
            />
          </div>
        ))}
        <article css={chatStyle}>
          <h3>도움이 필요하신가요?</h3>
          <button onClick={() => alert("준비중입니다!")}>
            <Chat />
            <span>챗봇 상담하기</span>
          </button>
        </article>
      </section>
    </Layout>
  );
};

export default Owner;
