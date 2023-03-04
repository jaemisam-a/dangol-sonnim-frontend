import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Share from "public/icons/Share.svg";
import ArrowLeft from "public/icons/ArrowLeft.svg";
import Kebab from "public/icons/Kebab.svg";
import Hamburger from "public/icons/Hamburger.svg";
import Close from "public/icons/Close.svg";
import Check from "public/icons/Check.svg";
import Owner from "public/images/logo/Owner.svg";
import useLoginStore from "src/store/login";

type HeaderProps = {
  subTitle?: string;
  goHome?: boolean;
  isXButton?: boolean;
  isCheckButton?: boolean;
  isLogo?: boolean;
};

const container = (pathname: string) => css`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  background-color: ${Colors.white};
  border-bottom: ${pathname !== "/" && `1px solid ${Colors.neutral20}`};
  z-index: 1;
  width: 100%;
`;

const wrapper = (pathname: string) => css`
  width: 100%;
  max-width: ${pathname.includes("owner") ? "768px" : "480px"};
  height: 3.25rem;
  box-shadow: ${pathname.includes("owner")
    ? "none"
    : "rgb(130 130 130 / 15%) 0px -1.25rem 1.25rem"};
`;

const innerWrapper = (pathname: string) => css`
  padding: ${pathname === "/" ? "0.5rem" : "0.75rem"} 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const logo = css`
  display: flex;
  align-items: baseline;
  gap: 0.313rem;
  cursor: pointer;
`;

const buttons = css`
  display: flex;
  gap: 0.25rem;
  color: ${Colors.neutral90};

  button {
    background-color: transparent;
  }
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
  color: ${Colors.neutral90};
  ${Texts.B2_14_R_line}
`;

const buttonDot = css`
  ${Texts.B2_14_R1}
`;

const pageTitle = css`
  ${Texts.S1_16_R}
`;

const hiddenItem = css`
  visibility: hidden;
  width: 1.75rem;
  height: 1.75rem;
`;

const hamburgerButton = css`
  background-color: transparent;
`;

const Header = (props: HeaderProps) => {
  const { pathname, back, push } = useRouter();
  const { isLogin } = useLoginStore();

  return (
    <div css={container(pathname)}>
      <header css={wrapper(pathname)}>
        <div css={innerWrapper(pathname)}>
          {props.isLogo ? (
            <>
              <span css={logo}>
                <Image
                  css={pointerButton}
                  src="/images/logo/Logo.png"
                  alt="logo"
                  width="27"
                  height="36"
                />
                <Owner />
              </span>
              <span css={pageTitle}>{props.subTitle}</span>
              {pathname === "/owner" ? (
                <button css={textButton} onClick={() => push("/owner/login")}>
                  로그인/회원가입
                </button>
              ) : (
                <button css={hamburgerButton}>
                  <Hamburger />
                </button>
              )}
            </>
          ) : pathname === "/" ? (
            <>
              <Image
                css={pointerButton}
                src="/images/logo/Logo.png"
                alt="logo"
                width="27"
                height="36"
              />
              <div css={buttons}>
                {isLogin ? (
                  <button onClick={() => push("/my")}>
                    <Image
                      css={pointerButton}
                      src="/images/Profile.png"
                      alt="profile"
                      width="34"
                      height="34"
                    />
                  </button>
                ) : (
                  <>
                    <button css={textButton} onClick={() => push("/owner")}>
                      사장님 페이지
                    </button>
                    <span css={buttonDot}>•</span>
                    <button css={textButton} onClick={() => push("/login")}>
                      로그인/회원가입
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                css={pointerButton}
                onClick={
                  props.goHome
                    ? () => push(pathname.includes("owner") ? "/owner" : "/")
                    : () => back()
                }
              >
                {props.isXButton ? (
                  <Close width={28} height={28} stroke={Colors.neutral90} />
                ) : (
                  <ArrowLeft stroke={Colors.amber50} />
                )}
              </button>
              <span css={pageTitle}>{props.subTitle}</span>
              {pathname === "/my" ? (
                <div css={pointerButton}>
                  <Kebab />
                </div>
              ) : pathname === "/store/[id]" ? (
                <div css={pointerButton}>
                  <Share />
                </div>
              ) : props.isCheckButton ? (
                <div css={pointerButton}>
                  <Check width={24} height={24} fill={Colors.amber50} />
                </div>
              ) : (
                <div css={hiddenItem} />
              )}
              {pathname === "/my" ? (
                <div css={pointerButton}>
                  <Kebab />
                </div>
              ) : pathname === "/store/[id]" ? (
                <div css={pointerButton}>
                  <Share />
                </div>
              ) : props.isCheckButton ? (
                <div css={pointerButton}>
                  <Check width={24} height={24} fill={Colors.amber50} />
                </div>
              ) : (
                <div css={hiddenItem} />
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
