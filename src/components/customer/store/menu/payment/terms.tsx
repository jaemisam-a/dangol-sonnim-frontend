import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Tab from "common/tab";

export type TermsType =
  | "refund"
  | "privacy"
  | "privacyThirdParties"
  | "payment"
  | "use"
  | "marketing"
  | null;

type TermsProps = {
  isOwner?: boolean;
  selectedTerms: TermsType;
  storeName: string;
};

const wrapper = css`
  padding: 1.5rem 1.25rem;

  h2 {
    ${Texts.S1_16_M}
  }
`;

const titleStyle = css`
  ${Texts.H1_20_B}
`;

const infoStyle = css`
  ${Texts.B2_14_R1}
  color:${Colors.neutral90};
  margin-top: 0.25rem;
  margin-bottom: 1.5rem;
`;

const descStyle = css`
  ${Texts.B3_15_R1}
  margin-top: 0.25rem;
  margin-bottom: 1.75rem;
`;

const tableStyle = css`
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  border-collapse: collapse;

  td {
    border: 1px solid ${Colors.neutral50};
  }

  td:first-of-type {
    ${Texts.S1_16_M}
    width: 7rem;
    text-align: center;
    padding: 0.5rem;
  }

  td:nth-of-type(2) {
    ${Texts.B3_15_R1}
    color: ${Colors.neutral90};
    padding: 0.5rem;
    vertical-align: top;
  }
`;

const subTitleStyle = css`
  ${Texts.S1_16_M}
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const paymentTermStyle = css`
  margin-bottom: 1rem;
`;

const iframeWrapper = css`
  position: relative;
  width: 100%;
`;

const iframeStyle = css`
  position: absolute;
  border: none;
  width: 100%;
  height: 50vh;
`;

const ownerListStyle = css`
  ${Texts.B3_15_R1}

  h1 {
    margin-bottom: 0.75rem;
  }

  ul {
    margin-left: 1rem;
  }

  li {
    list-style-type: disc;
    margin-left: 1rem;
  }
`;

const Terms = ({ isOwner, selectedTerms, storeName }: TermsProps) => {
  const [termsTitle, setTermsTitle] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const getTermTitle = () => {
    switch (selectedTerms) {
      case "refund":
        return setTermsTitle("구독취소 등 환불 안내 확인 및 동의");
      case "privacy":
        return setTermsTitle("개인정보 수집 및 이용 동의");
      case "privacyThirdParties":
        return setTermsTitle("개인정보 제3자 제공 동의");
      case "payment":
        return setTermsTitle("결제대행 서비스 이용약관 동의");
      case "marketing":
        return setTermsTitle("마케팅 정보 수신 동의");
    }
  };

  useEffect(() => {
    getTermTitle();
  }, [selectedTerms]);

  if (!isOwner) {
    switch (selectedTerms) {
      case "refund":
        return (
          <article css={wrapper}>
            <h1 css={titleStyle}>{termsTitle}</h1>
            <p css={infoStyle}>
              *반복 결제되며 언제든지 취소할 수 있습니다. 제휴업체가 혜택을 업데이트할 수 있습니다.
            </p>
            <h2>1.신규 및 기존 회원</h2>
            <p css={descStyle}>
              활성 상태인 유료 구독권이 있으면 매월 결제 주기가 시작될 때마다 요금이 자동으로
              청구됩니다.
            </p>
            <h2>2.취소된 구독권</h2>
            <p css={descStyle}>
              구독을 취소하면 다시 구독하지 않는 한 요금이 청구되지 않습니다. 구독 혜택은 결제
              기간이 종료될 때까지 받을 수 있습니다.
            </p>
            <h2>3.구독권 환불</h2>
            <p css={descStyle}>
              언제든지 구독을 취소할 수 있습니다. 구독 취소시 결제 주기의 마지막 날까지 구독 혜택을
              제공받을 수 있습니다. 구독을 취소하는 시점과 구독이 공식적으로 종료되는 시점 사이의
              기간에 대해서는 환불되지 않습니다.
            </p>
          </article>
        );

      case "privacy":
        return (
          <article css={wrapper}>
            <h1 css={titleStyle}>{termsTitle}</h1>
            <table css={tableStyle}>
              <tbody>
                <tr>
                  <td>기본 수집 항목</td>
                  <td>[필수]단골손님 닉네임, 이름, 휴대전화번호</td>
                </tr>
                <tr>
                  <td>
                    수집 및<br />
                    이용목적
                  </td>
                  <td>
                    제휴업체와 구독 이용자의 원활한 거래 진행, 고객상담, 불만처리 등 민원 처리,
                    분쟁조정 해결을 위한 기록보존
                  </td>
                </tr>
                <tr>
                  <td>보관기관</td>
                  <td>회원탈퇴시 파기, 전자상거래상 소비자 보호에 관한 법률에 따라 5년간 보관</td>
                </tr>
              </tbody>
            </table>
          </article>
        );

      case "privacyThirdParties":
        return (
          <article css={wrapper}>
            <h1 css={titleStyle}>{termsTitle}</h1>
            <table css={tableStyle}>
              <tbody>
                <tr>
                  <td>제공받는 자</td>
                  <td>{storeName}</td>
                </tr>
                <tr>
                  <td>제공하는 항목</td>
                  <td>단골손님 닉네임, 이름, 휴대 전화번호</td>
                </tr>
                <tr>
                  <td>제공 목적</td>
                  <td>회원탈퇴시 파기, 전자상거래상 소비자 보호에 관한 법률에 따라 5년간 보관</td>
                </tr>
                <tr>
                  <td>
                    제공받는 자의
                    <br />
                    개인정보 보유
                    <br />및 이용기간
                  </td>
                  <td>회원탈퇴 시 또는 위 개인정보 이용 목적 달성 시 까지 이용</td>
                </tr>
              </tbody>
            </table>
            <p css={infoStyle}>
              ※정보주체는 개인정보 제공 동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 구독이
              제한될 수 있습니다.
            </p>
          </article>
        );

      case "payment":
        const tossTerms = [
          { label: "전자금융거래\n기본약관", src: "https://pages.tosspayments.com/terms/user" },
          {
            label: "개인정보 수집\n및 이용 동의",
            src: "https://pages.tosspayments.com/terms/privacy",
          },
          {
            label: "개인정보 제3자\n제공 동의",
            src: "https://pages.tosspayments.com/terms/privacy2",
          },
        ];

        return (
          <article css={[wrapper, paymentTermStyle]}>
            <h1 css={titleStyle}>{termsTitle}</h1>
            <h2 css={subTitleStyle}>토스페이먼츠(주)</h2>
            <Tab
              tabs={tossTerms.map((item) => item.label)}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            >
              <div css={iframeWrapper}>
                <iframe css={iframeStyle} src={tossTerms[selectedTab].src} />
              </div>
            </Tab>
          </article>
        );

      default:
        return null;
    }
  } else {
    switch (selectedTerms) {
      case "use":
        return <article css={wrapper}>{/* TODO: 이용약관 정의되면 작성 */}</article>;

      case "privacy":
        return (
          <article css={[wrapper, ownerListStyle]}>
            <h1 css={titleStyle}>{termsTitle}</h1>
            <h2>
              단골손님은 단골손님-사장님 서비스 제공과 관련하여 아래와 같이 사용자의 개인정보를
              수집, 활용합니다.
            </h2>
            <h2>수집 및 이용항목</h2>
            <ul>
              <li>필수항목</li>
              <ul>
                <li>이메일</li>
              </ul>
              <li>수집 및 이용목적</li>
              <ul>
                <li>서비스 이용을 위한 이용자 식별, 이용자 개별적 통지 및 고지</li>
              </ul>
              <li>보유 및 이용기간</li>
              <ul>
                <li>회원탈퇴시 까지</li>
                <li>
                  ※ 단, 관계 법령 위반에 따른 수사, 조사 등이 진행중인 경우에는 해당 수사, 조사 종료
                  시 까지 보관하며 내부규정 위반시에 규정에 따라 일정기간 보관됨.
                </li>
              </ul>
            </ul>
            <h2>
              사용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 다만 동의 거부 시
              단골손님-사장님 서비스를 이용하실 수 없습니다.
            </h2>
          </article>
        );

      case "marketing":
        return (
          <article css={[wrapper, ownerListStyle]}>
            <h1 css={titleStyle}>{termsTitle}</h1>
            <h2>마케팅 수집이용동의서</h2>
            <h2>
              단골손님은 단골손님-사장님 서비스 마케팅 정보 제공과 관련하여 아래와 같이 사용자의
              개인정보를 수집, 활용합니다.
            </h2>
            <ul>
              <li>수집항목</li>
              <ul>
                <li>휴대전화번호, 이메일</li>
              </ul>
              <li>수집 및 이용목적</li>
              <ul>
                <li>마케팅 정보 제공</li>
              </ul>
              <li>보유 및 이용기간</li>
              <ul>
                <li>회원 혹은 동의 철회 시까지</li>
                <li>
                  ※ 단, 관계 법령 위반에 따른 수사, 조사 등이 진행중인 경우에는 해당 수사, 조사 종료
                  시 까지 보관하며 내부규정 위반시에 규정에 따라 일정기간 보관됨.
                </li>
              </ul>
            </ul>
            <h2>
              사용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 다만 동의 거부 시
              단골손님-사장님 서비스에서 제공하는 할인, 이벤트 및 이용자 맞춤형 상품 추천 등의
              마케팅 서비스 안내가 제공되지 않습니다.
            </h2>
          </article>
        );

      default:
        return null;
    }
  }
};

export default Terms;
