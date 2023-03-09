import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Layout from "common/layout";
import { Colors, Texts } from "styles/common";
import Check from "public/icons/Check.svg";

const wrapper = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: 100vh;
  padding: 2.375rem;
`;

const text = css`
  h1 {
    ${Texts.H1_20_B}
  }
  svg {
    margin-top: 1.25rem;
    margin-bottom: 3.25rem;
  }
`;

const link = css`
  ${Texts.S3_18_M}
  background-color: ${Colors.amber50};
  color: ${Colors.white};
  padding: 0.938rem 0;
  border-radius: 0.25rem;
`;

const Complete = () => {
  const { query, push } = useRouter();

  useEffect(() => {
    if (!query.isComplete) push("/owner/login");
  }, []);

  return (
    <Layout title="사업자 등록" subTitle="사업자 등록">
      <div css={wrapper}>
        <div css={text}>
          <h1>인증이 완료되었습니다</h1>
          <Check width={55} height={55} fill={Colors.green50} />
        </div>
        <Link href="/owner/mystore" css={link}>
          가게 등록하기
        </Link>
      </div>
    </Layout>
  );
};

export default Complete;
