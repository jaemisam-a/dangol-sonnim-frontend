import React, { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import CustomerHeader from "common/layout/header/customer";
import OwnerHeader from "common/layout/header/owner";
import BottomNav from "common/layout/nav/bottomNav";
import Toast from "common/toast";
import { Sizes } from "styles/common";

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

const wrapper = (isOwner: boolean) => css`
  width: 100vw;
  max-width: ${isOwner ? Sizes.owner_width : Sizes.customer_width};
  min-height: calc(100vh - ${isOwner ? Sizes.bottom_nav_height : "0px"});
  margin: auto;
  padding-bottom: ${isOwner ? Sizes.bottom_nav_height : "0"};
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
      <Toast />
      {isOwner && <BottomNav />}
    </>
  );
};

export default Layout;
