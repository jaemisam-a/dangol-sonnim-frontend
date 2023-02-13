import React, { useState } from "react";
import { css } from "@emotion/react";

import Layout from "customer/components/common/layout";
import Dialog from "customer/components/mypage/Dialog";
import Tab from "customer/components/mypage/Tab";
import Modal from "customer/components/common/Modal";

// FIXME: Review용 (Modal 완성되면 삭제정예정)
const test = css`
  background-color: grey;
  padding: 2rem;
`;

const dialogContent = [
  {
    usage: "withdrawal" as const,
    id: "aaa1234",
    name: "물고기1234",
    buttonText: { confirm: "탈퇴하기", cancel: "혜택 계속 사용하기" },
  },
  {
    usage: "unsubscribe" as const,
    id: "aaa4567",
    name: "정갈한솔 모든 메뉴 사이즈업",
    subscribeDate: "3월 2일",
    buttonText: { confirm: "구독 해지하기", cancel: "구독 유지하기" },
  },
];
const My = () => {
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [isUnsubcribeOpen, setIsUnsubscribeOpen] = useState(false);
  const onConfirm = () => {};
  const onCancel = () => {};
  const openWithdrawalModal = () => setIsWithdrawalOpen(true);
  const openUnsubscribeModal = () => setIsUnsubscribeOpen(true);
  const closeWithdrawalModal = () => setIsWithdrawalOpen(false);
  const closeUnsubscribeModal = () => setIsUnsubscribeOpen(false);
  return (
    <>
      <Layout title="마이페이지" subTitle="마이페이지">
        <Tab />

        <div
          css={css`
            display: flex;
            gap: 1rem;
          `}
        >
          <button onClick={openWithdrawalModal}>Open modal-탈퇴 </button>
          <Modal open={isWithdrawalOpen} onClose={closeWithdrawalModal}>
            <Dialog content={dialogContent[0]} onConfirm={onConfirm} onCancel={onCancel} />
          </Modal>
          <button onClick={openUnsubscribeModal}>Open modal-구독해지</button>
          <Modal open={isUnsubcribeOpen} onClose={closeUnsubscribeModal}>
            <Dialog content={dialogContent[1]} onConfirm={onConfirm} onCancel={onCancel} />
          </Modal>
        </div>
      </Layout>
    </>
  );
};

export default My;
