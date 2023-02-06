import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "@emotion/styled";

type LayoutProps = { children: ReactNode; title: string };

const Wrapper = styled.div`
  width: 100vw;
  max-width: 480px;
  margin: auto;
  box-shadow: rgb(130 130 130 / 15%) 0px 0px 20px;
`;

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
