import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css, keyframes } from "@emotion/react";

import { Colors, Sizes, Texts } from "styles/common";
import ArrowLeft from "public/icons/direction/arrowLeft.svg";
import Close from "public/icons/close/close.svg";

type BottomSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  isXButton: boolean;
  isBackButton: boolean;
  height: string;
  component: JSX.Element;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;

const fadeInBottom = keyframes`
  from {
    bottom: -40%;
  }

  to {
    bottom: 0;
  }
`;

const fadeOutBottom = keyframes`
  from {
    bottom: 0;
  }
  
  to {
    bottom: -40%;
  }
`;

const outerWrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

const wrapper = (isOwner: boolean) => css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  max-width: ${isOwner ? Sizes.owner_width : Sizes.customer_width};
  height: 100%;
  z-index: 2;
`;

const outerArea = (open: boolean, isOwner: boolean) => css`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: ${isOwner ? Sizes.owner_width : Sizes.customer_width};
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
  animation: ${open ? fadeIn : fadeOut} 0.3s ease-in;
`;

const bottomSheetWrapper = (open: boolean, height: string, isOwner: boolean) => css`
  position: absolute;
  bottom: 0;
  z-index: 4;
  width: 100%;
  max-width: ${isOwner ? Sizes.owner_width : Sizes.customer_width};
  height: ${height};
  background-color: ${Colors.white};
  border-radius: 10px 10px 0 0;
  animation: ${open ? fadeInBottom : fadeOutBottom} 0.3s ease-in;
`;

const titleSection = css`
  height: 3.25rem;
  border-bottom: 1px solid ${Colors.neutral20};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
`;

const titleText = css`
  ${Texts.S1_16_M}
`;

const pointerButton = (isVisible: boolean) => css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  visibility: ${!isVisible && "hidden"};
`;

const BottomSheet = (props: BottomSheetProps) => {
  const { pathname } = useRouter();

  const [isVisible, setIsVisible] = useState(props.open);

  const offBottomSheet = () => {
    props.setOpen(false);
  };

  useEffect(() => {
    !props.open ? setTimeout(() => setIsVisible(false), 290) : setIsVisible(true);
  }, [props.open]);

  if (!isVisible) return null;

  return (
    <div css={outerWrapper}>
      <div css={wrapper(pathname.includes("owner"))}>
        <div css={outerArea(props.open, pathname.includes("owner"))} onClick={offBottomSheet} />
        <div css={bottomSheetWrapper(props.open, props.height, pathname.includes("owner"))}>
          <div css={titleSection}>
            <button css={pointerButton(props.isBackButton)} onClick={offBottomSheet}>
              <ArrowLeft stroke={Colors.amber50} />
            </button>
            <h2 css={titleText}>{props.title}</h2>
            <button css={pointerButton(props.isXButton)} onClick={offBottomSheet}>
              <Close width={28} height={28} stroke={Colors.neutral90} />
            </button>
          </div>
          {props.component}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
