import React, { useState } from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import AccountSection from "owner/account/section";
import { Colors, Texts } from "styles/common";
import Modal from "common/Modal";
import Dialog from "customer/my/Dialog";
import BottomSheet from "common/BottomSheet";
import DepositAccount from "owner/account/deposit";
import PasswordChange from "owner/account/password";
import PhoneChange from "owner/account/phone";

const wrapper = css`
  padding: 0.5rem 1.25rem;
`;

const btnWrapper = css`
  margin-top: 1rem;

  button {
    color: ${Colors.neutral60};
    ${Texts.B1_13_R2}
  }
`;

const logout = css`
  padding-right: 0.25rem;
  margin-right: 0.25rem;
  border-right: 1px solid ${Colors.neutral50};
`;

const OwnerAccount = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAccountBS, setOpenAccountBS] = useState(false);
  const [openPasswordBS, setOpenPasswordBS] = useState(false);
  const [openPhoneBS, setOpenPhoneBS] = useState(false);
  const accountData = [
    { title: "이메일", contents: "abcdefg@gmail.com" },
    {
      title: "비밀번호",
      contents: "********",
      btnName: "변경",
      btnAction: () => setOpenPasswordBS(true),
    },
    {
      title: "핸드폰 번호",
      contents: "010-1234-1234",
      btnName: "변경",
      btnAction: () => setOpenPhoneBS(true),
    },
    { title: "사업자등록번호", contents: "010-1234-1234" },
    { title: "대표자성명", contents: "김두말" },
    { title: "개업일자", contents: "2013.11.3" },
    {
      title: "계좌번호",
      contents: "국민은행 225-25-0000-497",
      btnName: "변경",
      btnAction: () => setOpenAccountBS(true),
    },
  ];

  return (
    <Layout title="계정 정보" subTitle="계정 정보">
      <div css={wrapper}>
        {accountData.map((el) => (
          <AccountSection
            title={el.title}
            contents={el.contents}
            btnName={el.btnName}
            btnAction={el.btnAction}
            key={el.title}
          />
        ))}
        <div css={btnWrapper}>
          <button css={logout}>로그아웃</button>
          <button onClick={() => setOpenModal(true)}>회원탈퇴</button>
        </div>
      </div>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <Dialog
          content={{ buttonText: { confirm: "취소", cancel: "탈퇴" }, usage: "ownerWithdrawal" }}
          onCancel={() => {
            //TODO: 탈퇴기능
          }}
          onConfirm={() => setOpenModal(false)}
        />
      </Modal>
      <BottomSheet
        height="29.563rem"
        isBackButton={false}
        isXButton={true}
        open={openPasswordBS}
        setOpen={setOpenPasswordBS}
        title="비밀번호 변경"
        component={<PasswordChange setOpen={setOpenPasswordBS} />}
      />
      <BottomSheet
        height="23.938rem"
        isBackButton={false}
        isXButton={true}
        open={openPhoneBS}
        setOpen={setOpenPhoneBS}
        title="핸드폰 번호 변경"
        component={<PhoneChange setOpen={setOpenPhoneBS} />}
      />
      <BottomSheet
        height="30.5rem"
        isBackButton={false}
        isXButton={true}
        open={openAccountBS}
        setOpen={setOpenAccountBS}
        title="입금 계좌 등록"
        component={<DepositAccount setOpen={setOpenAccountBS} />}
      />
    </Layout>
  );
};

export default OwnerAccount;
