import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Layout from "common/layout";
import { Colors, Texts } from "styles/common";
import Check from "public/icons/Check.svg";

const wrapper = css`
  padding: 14.625rem 0 16.313rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const paymentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.375rem;
`;

const title = css`
  ${Texts.H1_20_B}
`;

const description = css`
  ${Texts.B3_15_R2}
`;

const buttonWrapper = css`
  margin-top: 6.625rem;
  width: 100%;
  padding: 0 1.25rem;
`;

const submitButton = css`
  width: 100%;
  background-color: ${Colors.amber50};
  border-radius: 0.25rem;
  height: 3rem;
  color: ${Colors.white};
  ${Texts.S3_18_M}
`;

const StorePaymentComplete = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query?.price) router.back();
  }, []);

  if (!router.query?.price) return null;

  return (
    <>
      <Layout title="결제완료" isNoHeader={true}>
        <div css={wrapper}>
          <div css={paymentWrapper}>
            <h1 css={title}>결제완료</h1>
            <Check width={55} height={55} fill={Colors.green50} />
            <div css={description}>
              결제금액 {Number(router.query.price).toLocaleString("ko-KR")}원이 정상적으로
              처리되었습니다!
            </div>
          </div>
          <div css={buttonWrapper}>
            <button css={submitButton} onClick={() => router.push("/customer")}>
              확인
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default StorePaymentComplete;
