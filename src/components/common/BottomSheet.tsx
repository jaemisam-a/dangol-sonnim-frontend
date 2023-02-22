import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import ArrowLeft from "public/icons/ArrowLeft.svg";
import Close from "public/icons/Close.svg";

type BottomSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
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

const outerWrapper = (open: boolean) => css`
  animation: ${open ? fadeIn : fadeOut} 0.3s ease-in;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

const wrapper = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  max-width: 480px;
  height: 100%;
  z-index: 2;
`;

const outerArea = css`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 480px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

const bottomSheetWrapper = (height: string) => css`
  position: absolute;
  bottom: 0;
  z-index: 4;
  width: 100%;
  max-width: 480px;
  height: ${height};
  background-color: ${Colors.white};
  border-radius: 10px 10px 0 0;
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
  const [isVisible, setIsVisible] = useState(props.open);

  const offBottomSheet = () => {
    props.setOpen(false);
  };

  useEffect(() => {
    !props.open ? setTimeout(() => setIsVisible(false), 290) : setIsVisible(true);
  }, [props.open]);

  if (!isVisible) return null;

  return (
    <div css={outerWrapper(props.open)}>
      <div css={wrapper}>
        <div css={outerArea} onClick={offBottomSheet} />
        <div css={bottomSheetWrapper(props.height)}>
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
