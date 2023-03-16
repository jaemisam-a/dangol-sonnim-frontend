import React, { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import CustomerHeader from "common/layout/header/customer";
import OwnerHeader from "common/layout/header/owner";
import BottomNav from "common/layout/nav/bottomNav";
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

const wrapper = (pathname: string) => css`
  width: 100vw;
  max-width: ${pathname.includes("/owner") ? Sizes.owner_width : Sizes.customer_width};
  min-height: calc(100vh - ${Sizes.bottom_nav_height});
  margin: auto;
  padding-bottom: ${pathname.includes("/owner") ? Sizes.bottom_nav_height : "0"};
  box-shadow: rgb(130 130 130 / 15%) 0px ${pathname.includes("/owner") ? "1.25rem" : "0"} 1.25rem;
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
      {pathname.includes("/owner") ? (
        <>
          <OwnerHeader
            subTitle={subTitle}
            goHome={goHome}
            isXButton={isXButton}
            isCheckButton={isCheckButton}
            isLogo={isLogo}
          />
          <div css={wrapper(pathname)}>{children}</div>
        </>
      ) : (
        <div css={wrapper(pathname)}>
          {!isNoHeader && <CustomerHeader subTitle={subTitle} goHome={goHome} />}
          {children}
        </div>
      )}
      {pathname.includes("/owner") && <BottomNav />}
    </>
  );
};

export default Layout;
