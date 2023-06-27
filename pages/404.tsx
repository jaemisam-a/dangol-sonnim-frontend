import React from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Layout from "common/layout";
import { Colors, Sizes, Texts } from "styles/common";

const wrapper = () => css`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${Sizes.header_height});

  h1 {
    ${Texts.H1_20_B};
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

const ErrorPage = () => {
  const { push } = useRouter();
  return (
    <Layout title="Not Found" subTitle="Not Found ">
      <div css={wrapper}>
        <h1>찾으시는 페이지가 없어요!</h1>
        <button onClick={() => push("/")}>메인페이지로 가기</button>
      </div>
    </Layout>
  );
};

export default ErrorPage;
