import React, { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";

import { Colors, Sizes } from "styles/common";
import MyInfo from "owner/settings/myInfo";

type SideNavProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
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

const fadeInSide = keyframes`
  from {
    right: -40%;
  }

  to {
    right: 0;
  }
`;

const fadeOutSide = keyframes`
  from {
    right: 0;
  }
  
  to {
    right: -40%;
  }
`;

const outerWrapper = (open: boolean) => css`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  animation: ${open ? fadeIn : fadeOut} 0.3s ease-in;
`;

const wrapper = css`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: ${Sizes.owner_width};
`;

const background = css`
  background-color: ${Colors.black};
  opacity: 60%;
  height: 100%;
`;

const content = (open: boolean) => css`
  position: absolute;
  top: 0;
  right: 0;
  width: 19rem;
  max-width: 100%;
  height: 100%;
  background-color: white;
  animation: ${open ? fadeInSide : fadeOutSide} 0.3s ease-in;

  button {
    background-color: transparent;
  }
`;

const SideNav = (props: SideNavProps) => {
  const [isVisible, setIsVisible] = useState(props.open);

  const handleClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.setOpen(false);
    }
  };

  useEffect(() => {
    !props.open ? setTimeout(() => setIsVisible(false), 290) : setIsVisible(true);
  }, [props.open]);

  if (!isVisible) return null;

  return (
    <div css={outerWrapper(props.open)} onClick={handleClose}>
      <div css={wrapper}>
        <div css={background} onClick={handleClose} />
        <section css={content(props.open)}>
          <MyInfo onClose={() => props.setOpen(false)} />
        </section>
      </div>
    </div>
  );
};

export default SideNav;
