import React, { ReactNode } from "react";
import Head from "next/head";
import { css } from "@emotion/react";

import Header from "common/layout/Header";

type LayoutProps = { children: ReactNode; title: string; subTitle?: string; isNoHeader?: boolean };

const wrapper = css`
  width: 100vw;
  max-width: 480px;
  min-height: 100vh;
  margin: auto;
  box-shadow: rgb(130 130 130 / 15%) 0px 0px 20px;
`;

const Layout = ({ children, title, subTitle, isNoHeader }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div css={wrapper}>
        {!isNoHeader && <Header subTitle={subTitle} />}
        {children}
      </div>
    </>
  );
};

export default Layout;
