import React from "react";
import { css, keyframes } from "@emotion/react";

import useToastStore from "src/store/toast";
import { Colors, Texts } from "styles/common";
import Warning from "public/icons/etc/warning.svg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const outerWrapper = css`
  animation: ${fadeIn} 0.6s ease-in;
  display: flex;
  justify-content: center;
`;

const wrapper = css`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 4.25rem;
  z-index: 10;
  padding: 1rem;
  width: 20rem;
  height: 5.25rem;
  background-color: ${Colors.neutral80};
  border-radius: 0.625rem;
  color: ${Colors.white};
  ${Texts.B2_14_R2}
`;

const textWrapper = css`
  display: flex;
  white-space: pre-wrap;
`;

const buttonWrapper = css`
  display: flex;
  align-items: flex-end;

  button {
    height: fit-content;
    color: ${Colors.white};
    ${Texts.B2_14_M}
  }
`;

const Toast = () => {
  const { message, type, setMessage } = useToastStore();

  // useEffect(() => {
  //   if (!message) return;
  //   setTimeout(() => {
  //     setMessage("");
  //   }, 600);
  // }, [message]);

  if (!message) return null;

  return (
    <div css={outerWrapper}>
      <div css={wrapper}>
        <div css={textWrapper}>
          {type === "warning" && <Warning />}
          <div>{message}</div>
        </div>
        <div css={buttonWrapper}>
          <button onClick={() => setMessage("")}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
