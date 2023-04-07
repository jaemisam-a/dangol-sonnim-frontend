import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Owner from "public/images/logo/owner.svg";
import Hamburger from "public/icons/menu/hamburger.svg";
import Close from "public/icons/close/close.svg";
import ArrowLeft from "public/icons/direction/arrowLeft.svg";
import Check from "public/icons/check/check.svg";
import { Colors, Sizes, Texts } from "styles/common";
import SideNav from "common/layout/nav/sideNav";

type OwnerHeaderProps = {
  isLogo?: boolean;
  subTitle?: string;
  goHome?: boolean;
  isXButton?: boolean;
  isCheckButton?: () => void;
};

const container = css`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  background-color: ${Colors.white};
  border-bottom: 1px solid ${Colors.neutral20};
  z-index: 1;
  width: 100%;
`;

const wrapper = css`
  width: 100%;
  max-width: ${Sizes.owner_width};
  height: 3.25rem;
`;

const innerWrapper = css`
  padding: 0.75rem 1.25rem;
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

const textButton = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${Colors.neutral90};
  ${Texts.B2_14_R_line}
`;

const pageTitle = css`
  ${Texts.S1_16_R}
`;

const hiddenItem = css`
  visibility: hidden;
  width: 1.75rem;
  height: 1.75rem;
`;

const OwnerHeader = (props: OwnerHeaderProps) => {
  const { pathname, back, push } = useRouter();

  const [openNav, setOpenNav] = useState(false);

  return (
    <div css={container}>
      <header css={wrapper}>
        <div css={innerWrapper}>
          {props.isLogo ? (
            <>
              <span css={logo}>
                <Image src="/images/logo/logo.png" alt="logo" width="27" height="36" />
                <Owner />
              </span>
              <span css={pageTitle}>{props.subTitle}</span>
              {pathname === "/owner" ? (
                <button css={textButton} onClick={() => push("/owner/login")}>
                  로그인/회원가입
                </button>
              ) : (
                <button onClick={() => setOpenNav(true)}>
                  <Hamburger />
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={props.goHome ? () => push("owner") : () => back()}>
                {props.isXButton ? (
                  <Close width={28} height={28} stroke={Colors.neutral90} />
                ) : (
                  <ArrowLeft stroke={Colors.amber50} />
                )}
              </button>
              <span css={pageTitle}>{props.subTitle}</span>
              {props.isCheckButton ? (
                <button onClick={props.isCheckButton}>
                  <Check width={24} height={24} fill={Colors.amber50} />
                </button>
              ) : (
                <div css={hiddenItem} />
              )}
            </>
          )}
        </div>
      </header>
      <SideNav open={openNav} setOpen={setOpenNav} />
    </div>
  );
};

export default OwnerHeader;
