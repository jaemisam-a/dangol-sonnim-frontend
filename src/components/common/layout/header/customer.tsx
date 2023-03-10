import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Share from "public/icons/etc/Share.svg";
import ArrowLeft from "public/icons/direction/ArrowLeft.svg";
import Kebab from "public/icons/menu/Kebab.svg";
import useLoginStore from "src/store/login";

type HeaderProps = {
  subTitle?: string;
  goHome?: boolean;
};

const container = css`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  background-color: ${Colors.white};
  z-index: 1;
  width: 100%;
  height: 3.25rem;
`;

const wrapper = (pathname: string) => css`
  border-bottom: ${pathname !== "/" && `1px solid ${Colors.neutral20}`};
  z-index: 1;
  width: 100%;
  max-width: 480px;
`;

const innerWrapper = (pathname: string) => css`
  padding: ${pathname === "/" ? "0.5rem" : "0.75rem"} 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const CustomerHeader = (props: HeaderProps) => {
  const { pathname, back, push } = useRouter();
  const { isLogin } = useLoginStore();

  return (
    <div css={container}>
      <header css={wrapper(pathname)}>
        <div css={innerWrapper(pathname)}>
          {pathname === "/" ? (
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
                      ????????? ?????????
                    </button>
                    <span css={buttonDot}>???</span>
                    <button css={textButton} onClick={() => push("/login")}>
                      ?????????/????????????
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <button css={pointerButton} onClick={props.goHome ? () => push("/") : () => back()}>
                <ArrowLeft stroke={Colors.amber50} />
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

export default CustomerHeader;
