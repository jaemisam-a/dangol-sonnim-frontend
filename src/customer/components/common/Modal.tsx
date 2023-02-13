import React, { ReactNode } from "react";
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
    opacity: 0.6;
  }
`;

const fadeOut = keyframes`
  from {
      opacity: 0.6;
  }
  
  to {
      opacity: 0;
    }
`;

const background = (open: boolean) => css`
  background-color: ${Colors.black};
  opacity: 60%;
  height: 100vh;
  width: 30rem;
  top: 0;
  position: absolute;
  animation: ${open ? fadeIn : fadeOut} 0.3s ease;
`;

const content = css`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const Modal = ({ children, open, onClose }: ModalProps) => {
  return open ? (
    <>
      <div css={background(open)} onClick={onClose} />
      <div css={content}>{children}</div>
    </>
  ) : null;
};

export default Modal;
