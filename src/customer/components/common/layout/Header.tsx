import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Share from "public/icons/Share.svg";
import ArrowLeft from "public/icons/ArrowLeft.svg";

type HeaderProps = {
  subTitle?: string;
};

const wrapper = (pathname: string) => css`
  position: sticky;
  top: 0;
  height: 3.25rem;
  background-color: ${Colors.white};
  border: ${pathname !== "/customer" && `1px solid ${Colors.neutral20}`};
`;

const innerWrapper = (pathname: string) => css`
  padding: ${pathname === "/customer" ? "0.5rem" : "0.75rem"} 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttons = css`
  display: flex;
  gap: 0.25rem;
  color: ${Colors.neutral90};
`;

const pointerButton = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const textButton = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  ${Texts.B2_14_R_line}
`;

const buttonDot = css`
  ${Texts.B2_14_R1}
`;

const hiddenItem = css`
  visibility: hidden;
  width: 28px;
  height: 28px;
`;

const pageTitle = css`
  ${Texts.S1_16_R}
`;

const Header = (props: HeaderProps) => {
  const { pathname } = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header css={wrapper(pathname)}>
      <div css={innerWrapper(pathname)}>
        {pathname === "/customer" ? (
          <>
            <Image css={pointerButton} src="/images/Logo.png" alt="logo" width="27" height="36" />
            <div css={buttons}>
              {isLoggedIn ? (
                <Image
                  css={pointerButton}
                  src="/images/Profile.png"
                  alt="profile"
                  width="34"
                  height="34"
                />
              ) : (
                <>
                  <span css={textButton}>사장님 페이지</span>
                  <span css={buttonDot}>•</span>
                  <span css={textButton} onClick={() => setIsLoggedIn(true)}>
                    로그인/회원가입
                  </span>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div css={pointerButton}>
              <ArrowLeft stroke={Colors.amber50} />
            </div>
            <span css={pageTitle}>{props.subTitle}</span>
            {pathname.includes("store") ? (
              <div css={pointerButton}>
                <Share />
              </div>
            ) : (
              <div css={hiddenItem} />
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
