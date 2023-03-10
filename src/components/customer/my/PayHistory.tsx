import React, { useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import RightIcon from "public/icons/direction/Right.svg";
import Modal from "common/Modal";
import Dialog from "customer/my/Dialog";

type paymentData = { price: number; date: string; frequency: number };

type HistoryProps = {
  storeName: string;
  prevPayment: paymentData[];
  nextPayment: paymentData;
};

const detail = css`
  display: flex;
  justify-content: space-between;
`;

const storeNameStyle = css`
  ${Texts.B1_13_R2}
  color:${Colors.neutral90};
`;

const priceStyle = css`
  ${Texts.B3_15_R2}
`;

const rightTextWrapper = (isComplete: boolean) => css`
  ${Texts.B2_14_R1}
  width: 6rem;

  & > p:first-child {
    color: ${isComplete ? Colors.green50 : Colors.neutral70};
  }
`;

const divider = css`
  margin: 1rem 0;
  border: solid ${Colors.neutral20} 1px;
`;

const subTitle = css`
  ${Texts.B3_15_B}
  margin-bottom: 0.5rem;
`;

const withdrawalBtn = css`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${Colors.neutral60};
  ${Texts.B1_13_R2}
`;

const PayHistory = ({ storeName, prevPayment, nextPayment }: HistoryProps) => {
  const [openModal, setOpenModal] = useState(false);

  const dummyDialog = {
    usage: "unsubscribe" as const,
    id: "aaa4567",
    name: "정갈한솔 모든 메뉴 사이즈업",
    subscribeDate: "3월 2일",
    buttonText: { confirm: "구독 해지하기", cancel: "구독 유지하기" },
  };

  return (
    <div>
      {prevPayment.map((el) => (
        <article key={el.frequency}>
          <div css={detail}>
            <div>
              <p css={storeNameStyle}>{storeName}</p>
              <p css={priceStyle}>월 {el.price.toLocaleString("ko-KR")}원</p>
            </div>
            <div css={rightTextWrapper(true)}>
              <p>결제완료</p>
              <p>{el.date}</p>
              <p>{el.frequency}회차</p>
            </div>
          </div>
          <hr css={divider} />
        </article>
      ))}
      <article>
        <p css={subTitle}>다음결제</p>
        <div css={detail}>
          <div>
            <p css={storeNameStyle}>{storeName}</p>
            <p css={priceStyle}>월 {nextPayment.price.toLocaleString("ko-KR")}원</p>
            <button css={withdrawalBtn} onClick={() => setOpenModal(true)}>
              <span>구독해지</span>
              <RightIcon stroke={Colors.neutral60} width={14} height={14} />
            </button>
          </div>
          <div css={rightTextWrapper(false)}>
            <p>결제예정</p>
            <p>{nextPayment.date}</p>
            <p>{nextPayment.frequency}회차</p>
          </div>
        </div>
      </article>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Dialog
          content={dummyDialog}
          onCancel={() => setOpenModal(false)}
          onConfirm={() => {
            /** TODO: 구독해지 기능 */
          }}
        />
      </Modal>
    </div>
  );
};

export default PayHistory;
