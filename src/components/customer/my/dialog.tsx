import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type DialogProps = {
  content: {
    usage?: "withdrawal" | "unsubscribe" | "ownerWithdrawal";
    id?: string;
    name?: string;
    subscribeDate?: string;
    buttonText: { confirm: string; cancel: string };
    title?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
};

const wrapper = css`
  background-color: ${Colors.white};
  color: ${Colors.black};
  width: 20rem;
  padding: 1.5rem 1.25rem;
  border-radius: 0.625rem;
  text-align: center;
`;

const headingWrapper = css`
  margin-bottom: 1.5rem;
`;

const heading = css`
  ${Texts.S3_18_B}
  white-space: pre;
  margin: 0 0 1rem;
`;

const infoText = css`
  ${Texts.B3_15_R2}
  line-height: 1.25rem;

  & span {
    color: ${Colors.amber50};
    ${Texts.B3_15_B}
  }
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

  & button.confirmBtn {
    background-color: ${Colors.neutral50};
  }
  & button.cancelBtn {
    background-color: ${Colors.amber50};
  }
`;

const Dialog = ({ content, onConfirm, onCancel }: DialogProps) => {
  const getHeading = () => {
    switch (content.usage) {
      case "withdrawal":
        return `${content.name}님,\n정말 회원 탈퇴하시겠습니까?`;
      case "unsubscribe":
        return `${content.name},\n구독 해지하겠습니까?`;
      case "ownerWithdrawal":
        return "회원탈퇴 요청을 하시겠습니까?";
      default:
        return <div>{content.title}</div>;
    }
  };

  const getDescription = () => {
    switch (content.usage) {
      case "withdrawal":
        return (
          <div css={infoText}>
            현재 구독중인 구독권에 대한 환불은 어려워요!
            <br />
            남은 기간 동안의 <span>혜택</span>을 사용해보세요!
          </div>
        );
      case "unsubscribe":
        return (
          <div>
            해당 구독권은 {content.subscribeDate}까지 사용 가능하고 해당 날짜 이후 구독권이
            종료됩니다.
          </div>
        );
      case "ownerWithdrawal":
        return (
          <div>
            회원탈퇴 요청을 하시게되면 빠른 시일 내<br />
            담당 부서에서 연락을 드릴 예정입니다.
          </div>
        );
    }
  };

  return (
    <div css={wrapper}>
      <div css={headingWrapper}>
        <h1 css={heading}>{getHeading()}</h1>
        {getDescription()}
      </div>
      <div css={buttonWrapper}>
        <button className="confirmBtn" onClick={onConfirm}>
          {content.buttonText.confirm}
        </button>
        <button className="cancelBtn" onClick={onCancel}>
          {content.buttonText.cancel}
        </button>
      </div>
    </div>
  );
};

export default Dialog;
