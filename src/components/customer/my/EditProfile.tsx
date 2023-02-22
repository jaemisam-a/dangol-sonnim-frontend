import React, { useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Avatar from "common/Avatar";
import InputSection from "common/input/Section";
import Modal from "common/Modal";
import Dialog from "customer/my/Dialog";

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding-top: 2.25rem;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
`;

const btnWrapper = css`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
  cursor: pointer;
  width: fit-content;
  ${Texts.B1_13_R2};

  button {
    color: ${Colors.neutral60};
    background-color: transparent;
  }
`;

const btnDivider = css`
  color: ${Colors.neutral50};
  cursor: default;
`;

const inputList = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-bottom: 1px solid ${Colors.neutral20};
  margin-top: 1rem;
  padding-bottom: 0.75rem;
`;

const EditProfile = () => {
  const dialogContent = [
    {
      usage: "withdrawal" as const,
      id: "aaa1234",
      name: "물고기1234",
      buttonText: { confirm: "탈퇴하기", cancel: "혜택 계속 사용하기" },
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div css={wrapper}>
        <Avatar />
        <div css={inputList}>
          <InputSection label="닉네임" placeholder="닉네임 입력" btn="중복확인" isBottom={true} />
          <InputSection
            label="휴대폰 번호"
            placeholder="휴대폰 번호 입력('-'제외)"
            btn="다시 본인인증"
            isBottom={true}
          />
        </div>
        <div css={btnWrapper}>
          <button
            onClick={() => {
              //TODO: 로그아웃
            }}
          >
            로그아웃
          </button>
          <span css={btnDivider}>|</span>
          <button onClick={() => setOpenModal(true)}>회원탈퇴</button>
        </div>
        <Modal onClose={() => setOpenModal(false)} open={openModal}>
          <Dialog
            content={dialogContent[0]}
            onCancel={() => setOpenModal(false)}
            onConfirm={() => {
              //TODO: 탈퇴기능
            }}
          />
        </Modal>
      </div>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <Dialog
          content={dialogContent[0]}
          onCancel={() => setOpenModal(false)}
          onConfirm={() => {
            //TODO: 탈퇴기능
          }}
        />
      </Modal>
    </>
  );
};

export default EditProfile;
