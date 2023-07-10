import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { css } from "@emotion/react";

import CustomerHeader from "common/layout/header/customer";
import Toast from "common/toast";
import { Sizes } from "styles/common";
import UserWithAuth from "src/utils/userWithAuth";

type LayoutProps = {
  children: ReactNode;
  title: string;
  subTitle?: string;
  isNoHeader?: boolean;
  goHome?: boolean;
};

const wrapper = css`
  width: 100vw;
  max-width: ${Sizes.customer_width};
  min-height: 100vh;
  margin: auto;
  padding-bottom: 0;
  box-shadow: rgb(130 130 130 / 15%) 0px 0 1.25rem;
`;

const Layout = ({ children, title, subTitle, isNoHeader, goHome }: LayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div css={wrapper}>
        {!isNoHeader && <CustomerHeader subTitle={subTitle} goHome={goHome} />}
        {children}
      </div>
      <Toast />
    </>
  );
};

export default UserWithAuth(Layout);
