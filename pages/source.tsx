import React from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import { Colors, Texts } from "styles/common";

const wrapper = css`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const title = css`
  ${Texts.S1_16_B}
`;

const subTitle = css`
  ${Texts.S1_16_M}
`;

const contents = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const firstContents = css`
  ${Texts.B3_15_M1}
`;

const secondContents = css`
  color: ${Colors.neutral70};
  ${Texts.B2_14_M}
`;

const link = css`
  color: ${Colors.neutral60};
  word-break: break-all;
  ${Texts.B2_14_M}

  :hover {
    text-decoration: underline;
  }
`;

const Source = () => {
  return (
    <>
      <Layout title="아이콘 디자인 정보">
        <div css={wrapper}>
          <div css={title}>정보</div>
          <div>
            <div css={subTitle}>아이콘 디자인 소스 정보</div>
            <div css={contents}>
              <span css={firstContents}>coolicons | Free Iconset</span>
              <span css={secondContents}>By Kryston Schwarze</span>
            </div>
          </div>
          <a
            href="https://www.figma.com/community/file/800815864899415771"
            target="_blank"
            css={link}
          >
            https://www.figma.com/community/file/800815864899415771
          </a>
        </div>
      </Layout>
    </>
  );
};

export default Source;
