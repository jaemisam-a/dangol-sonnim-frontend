import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type BottomSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  isXButton: boolean;
  isBackButton: boolean;
  height: string;
  component: JSX.Element;
};

const outerArea = css`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 480px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

const wrapper = (height: string) => css`
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
  cursor: pointer;
  visibility: ${isVisible && "hidden"};
`;

const BottomSheet = (props: BottomSheetProps) => {
  const offBottomSheet = () => {
    props.setOpen(false);
  };

  if (props.open)
    return (
      <>
        <div css={outerArea} onClick={offBottomSheet} />
        <div css={wrapper(props.height)}>
          <div css={titleSection}>
            <Image
              css={pointerButton(props.isBackButton)}
              onClick={offBottomSheet}
              src="/images/Arrow_Left_MD.png"
              alt="arrow-left"
              width="28"
              height="28"
            />
            <h2 css={titleText}>{props.title}</h2>
            <Image
              css={pointerButton(props.isXButton)}
              onClick={offBottomSheet}
              src="/images/X-Icon.png"
              alt="x-icon"
              width="28"
              height="28"
            />
          </div>
          {props.component}
        </div>
      </>
    );

  return null;
};

export default BottomSheet;
