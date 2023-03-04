import React, { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Header from "common/layout/Header";
import Nav from "common/layout/Nav";

type LayoutProps = {
  children: ReactNode;
  title: string;
  subTitle?: string;
  isNoHeader?: boolean;
  goHome?: boolean;
  isXButton?: boolean;
  isCheckButton?: boolean;
  isLogo?: boolean;
};

const wrapper = (pathname: string) => css`
  width: 100vw;
  max-width: ${pathname.includes("/owner") ? "768px" : "480px"};
  min-height: 100vh;
  margin: auto;
  box-shadow: rgb(130 130 130 / 15%) 0px 1.25rem 1.25rem;
`;

const Layout = ({
  children,
  title,
  subTitle,
  isNoHeader,
  goHome,
  isXButton,
  isCheckButton,
  isLogo,
}: LayoutProps) => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {!isNoHeader && (
        <Header
          subTitle={subTitle}
          goHome={goHome}
          isXButton={isXButton}
          isCheckButton={isCheckButton}
          isLogo={isLogo}
        />
      )}
      <div css={wrapper(pathname)}>{children}</div>
      {pathname.includes("/owner") && <Nav />}
    </>
  );
};

export default Layout;
