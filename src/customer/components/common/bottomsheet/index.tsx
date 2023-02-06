import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styled from "@emotion/styled";

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

type WrapperProps = {
  height: string;
};

type PointerButtonProps = {
  isVisible: boolean;
};

const OuterArea = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 480px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  bottom: 0;
  z-index: 4;
  width: 100%;
  max-width: 480px;
  height: ${(props) => props.height};
  background-color: ${Colors.white};
  border-radius: 10px 10px 0 0;
`;

const TitleSection = styled.div`
  height: 3.25rem;
  border-bottom: 1px solid ${Colors.neutral20};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
`;

const TitleText = styled.div`
  ${Texts.S1_16_M}
`;

const PointerButton = styled(Image)<PointerButtonProps>`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  visibility: ${(props) => !props.isVisible && "hidden"};
`;

const BottomSheet = (props: BottomSheetProps) => {
  const offBottomSheet = () => {
    props.setOpen(false);
  };

  if (props.open)
    return (
      <>
        <OuterArea onClick={offBottomSheet} />
        <Wrapper height={props.height}>
          <TitleSection>
            <PointerButton
              onClick={offBottomSheet}
              src="/images/Arrow_Left_MD.png"
              alt="arrow-left"
              width="28"
              height="28"
              isVisible={props.isBackButton}
            />
            <TitleText>{props.title}</TitleText>
            <PointerButton
              onClick={offBottomSheet}
              src="/images/X-Icon.png"
              alt="x-icon"
              width="28"
              height="28"
              isVisible={props.isXButton}
            />
          </TitleSection>
          {props.component}
        </Wrapper>
      </>
    );

  return null;
};

export default BottomSheet;
