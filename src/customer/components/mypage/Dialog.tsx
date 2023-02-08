import { css } from "@emotion/react";
import React from "react";
import { Colors, Texts } from "styles/common";

type DialogProps = {
  content: {
    usage: "withdrawal" | "unsubscribe";
    id: string;
    additionalText?: JSX.Element;
    buttonText: { left: string; right: string };
  };
};

const wrapper = css`
  background-color: ${Colors.white};
  color: ${Colors.black};
  width: 20rem;
  padding: 2rem 1.25rem;
  border-radius: 0.625rem;
  text-align: center;
`;

const headingWrapper = css`
  margin-bottom: 1.5rem;
`;

const heading = css`
  ${Texts.S3_18_B}
  white-space: pre;
`;

const buttonWrapper = css`
  display: flex;
  justify-content: center;
  gap: 0.75rem;

  & button {
    width: 100%;
    border-radius: 4px;
    padding: 0.563rem 0;
    color: ${Colors.white};
    ${Texts.B3_15_M2}
  }

  & button.leftBtn {
    background-color: ${Colors.neutral50};
  }
  & button.rightBtn {
    background-color: ${Colors.amber50};
  }
`;

const Dialog = ({ content }: DialogProps) => {
  return (
    <div css={wrapper}>
      <div css={headingWrapper}>
        <h1 css={heading}>
          {content.usage === "withdrawal"
            ? `${content.id}님,\n 정말 회원 탈퇴하시겠습니까?`
            : `${content.id}, \n 구독 해지하겠습니까?`}
        </h1>
        {content.additionalText ?? null}
      </div>
      <div css={buttonWrapper}>
        <button className="leftBtn">{content.buttonText.left}</button>
        <button className="rightBtn">{content.buttonText.right}</button>
      </div>
    </div>
  );
};

export default Dialog;
