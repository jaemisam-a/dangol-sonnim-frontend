import React, { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import CustomerHeader from "common/layout/header/customer";
import OwnerHeader from "common/layout/header/owner";
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

const BOTTOM_NAV_HEIGHT = "3.875rem";

const wrapper = (isOwner: boolean) => css`
  width: 100vw;
  max-width: ${isOwner ? "768px" : "480px"};
  min-height: calc(100vh - ${isOwner ? BOTTOM_NAV_HEIGHT : "0px"});
  margin: auto;
  padding-bottom: ${isOwner ? BOTTOM_NAV_HEIGHT : "0"};
  box-shadow: rgb(130 130 130 / 15%) 0px ${isOwner ? "1.25rem" : "0"} 1.25rem;
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

  const isOwner = pathname.includes("/owner");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {isOwner ? (
        <>
          <OwnerHeader
            subTitle={subTitle}
            goHome={goHome}
            isXButton={isXButton}
            isCheckButton={isCheckButton}
            isLogo={isLogo}
          />
          <div css={wrapper(isOwner)}>{children}</div>
        </>
      ) : (
        <div css={wrapper(isOwner)}>
          {!isNoHeader && <CustomerHeader subTitle={subTitle} goHome={goHome} />}
          {children}
        </div>
      )}
      {isOwner && <Nav />}
    </>
  );
};

export default Layout;
