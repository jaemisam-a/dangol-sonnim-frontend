import React, { MouseEvent, ReactNode, useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";

import { Colors } from "styles/common";

type ModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
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

const outerWrapper = (open: boolean) => css`
  animation: ${open ? fadeIn : fadeOut} 0.3s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const wrapper = css`
  width: 100%;
  height: 100%;
  max-width: 480px;
`;

const background = css`
  background-color: ${Colors.black};
  opacity: 60%;
  height: 100%;
  width: 100%;
  top: 0;
`;

const content = css`
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const Modal = ({ children, open, onClose }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(open);

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    !open ? setTimeout(() => setIsVisible(false), 290) : setIsVisible(true);
  }, [open]);

  if (!isVisible) return null;

  return (
    <>
      <div css={outerWrapper(open)} onClick={handleClose}>
        <div css={wrapper}>
          <div css={background} onClick={onClose} />
          <div css={content}>{children}</div>
        </div>
      </div>
    </>
  );
};
export default Modal;
