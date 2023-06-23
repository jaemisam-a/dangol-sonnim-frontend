import React, { ReactNode } from "react";
import Head from "next/head";
import { css } from "@emotion/react";

import OwnerHeader from "common/layout/header/owner";
import BottomNav from "common/layout/nav/bottomNav";
import Toast from "common/toast";
import { Sizes } from "styles/common";
import OwnerWithAuth from "src/utils/ownerWithAuth";

type LayoutProps = {
  children: ReactNode;
  title: string;
  subTitle?: string;
  goHome?: boolean;
  isXButton?: boolean;
  checkBtnFnc?: () => void;
  isLogo?: boolean;
};

const wrapper = css`
  width: 100vw;
  max-width: ${Sizes.owner_width};
  min-height: calc(100vh - ${Sizes.bottom_nav_height});
  margin: auto;
  padding-bottom: ${Sizes.bottom_nav_height};
  box-shadow: rgb(130 130 130 / 15%) 0px 1.25rem 1.25rem;
`;

const OwnerLayout = ({
  children,
  title,
  subTitle,
  goHome,
  isXButton,
  checkBtnFnc,
  isLogo,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <OwnerHeader
        subTitle={subTitle}
        goHome={goHome}
        isXButton={isXButton}
        checkBtnFnc={checkBtnFnc}
        isLogo={isLogo}
      />
      <div css={wrapper}>{children}</div>
      <Toast />
      <BottomNav />
    </>
  );
};

export default OwnerWithAuth(OwnerLayout);
