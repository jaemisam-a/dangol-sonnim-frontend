import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "@emotion/styled";

import Header from "customer/components/common/layout/Header";

type LayoutProps = { children: ReactNode; title: string; subTitle?: string };

const Wrapper = styled.div`
  width: 100vw;
  max-width: 480px;
  margin: auto;
  box-shadow: rgb(130 130 130 / 15%) 0px 0px 20px;
`;

const Layout = ({ children, title, subTitle }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Wrapper>
        <Header subTitle={subTitle} />
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;
