import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import { Colors, Texts } from "styles/common";
import Avatar from "common/Avatar";
import InputSection from "common/input/Section";
import Modal from "common/Modal";
import Dialog from "customer/my/Dialog";
import useLoginStore from "src/store/login";

type InpustStateTypes = "error" | "success" | "info" | "";

type InputSectionTypes = {
  label?: string;
  placeholder?: string;
  btn?: string;
  isRequired?: boolean;
  state?: InpustStateTypes;
  btnFnc?: () => void;
  message?: { error?: string; success: string; info?: string };
  objectKey: string;
  hidden?: boolean;
  type: "text" | "number" | "";
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding-top: 2.25rem;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
`;

const btnWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  ${Texts.B1_13_R2};

  button {
    color: ${Colors.neutral60};
    background-color: transparent;
    cursor: pointer;
  }

  div {
    display: flex;
    gap: 0.25rem;
  }
`;

const iconInfo = css`
  ${Texts.C2_12_M}
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
  const { push } = useRouter();
  const { logout } = useLoginStore();

  const dialogContent = [
    {
      usage: "withdrawal" as const,
      id: "aaa1234",
      name: "물고기1234",
      buttonText: { confirm: "탈퇴하기", cancel: "혜택 계속 사용하기" },
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [inputState, setInputState] = useState<InpustStateTypes[]>(["", ""]);
  const [profileData, setProfileData] = useState({ name: "", phone: "", phoneAuth: "" });
  const [inputArr, setInputArr] = useState<InputSectionTypes[]>([]);

  const checkValid = () => {
    // TODO: 닉네임 중복확인 api 요청
    if (!profileData.name) return alert("닉네임을 입력하세요.");
    const randomNum = Math.floor(Math.random() * 2) + 1;
    randomNum === 1
      ? setInputState((prev) => ["success", prev[1]])
      : setInputState((prev) => ["error", prev[1]]);
  };

  const requestAuth = () => {
    // TODO: 인증요청 api 요청
    if (!profileData.phone) return alert("전화번호를 입력하세요.");
    setInputArr((prev) => [prev[0], { ...prev[1], btn: "재전송" }, { ...prev[2], hidden: false }]);
    setInputState((prev) => [prev[0], prev[1], "info"]);
  };

  const checkAuth = () => {
    // TODO: 문자인증 api 요청
    if (!profileData.phoneAuth) return alert("인증번호를 입력하세요.");
    const randomNum = Math.floor(Math.random() * 2) + 1;
    randomNum === 1
      ? setInputState((prev) => [prev[0], prev[1], "success"])
      : setInputState((prev) => [prev[0], prev[1], "error"]);
  };

  useEffect(() => {
    setInputArr([
      {
        label: "닉네임",
        placeholder: "닉네임 입력",
        btn: "중복확인",
        isRequired: false,
        btnFnc: checkValid,
        message: { success: "사용가능한 닉네임입니다.", error: "중복된 닉네임입니다." },
        objectKey: "name",
        type: "text",
      },
      {
        label: "휴대폰 번호",
        placeholder: "휴대폰 번호 입력('-'제외)",
        btn: "인증요청",
        isRequired: false,
        btnFnc: requestAuth,
        objectKey: "phone",
        type: "number",
      },
      {
        btn: "문자인증",
        btnFnc: checkAuth,
        message: {
          success: "인증되었습니다.",
          info: "문자로 전송된 숫자를 입력해주세요.",
          error: "인증번호가 맞지 않습니다.",
        },
        objectKey: "phoneAuth",
        hidden: true,
        type: "number",
      },
    ]);
  }, []);

  useEffect(() => {
    setInputArr((prev) => [
      { ...prev[0], btnFnc: checkValid },
      { ...prev[1], btnFnc: requestAuth },
      { ...prev[2], btnFnc: checkAuth },
    ]);
  }, [profileData]);

  return (
    <>
      <div css={wrapper}>
        <Avatar />
        <div css={inputList}>
          {inputArr.map((el, idx) => (
            <InputSection
              label={el.label}
              placeholder={el.placeholder}
              btn={el.btn}
              isBottom={true}
              key={idx}
              isRequired={el.isRequired}
              inputState={inputState[idx]}
              action={el.btnFnc}
              message={el.message}
              setState={setProfileData}
              objectKey={el.objectKey}
              hidden={el.hidden}
              state={profileData[el.objectKey as "name" | "phone" | "phoneAuth"]}
              type={el.type as "text" | "number"}
            />
          ))}
        </div>
        <div css={btnWrapper}>
          <div>
            <button
              onClick={() => {
                //TODO: 로그아웃
                logout();
                push("/");
              }}
            >
              로그아웃
            </button>
            <span css={btnDivider}>|</span>
            <button onClick={() => setOpenModal(true)}>회원탈퇴</button>
          </div>
          <button css={iconInfo} onClick={() => push("/source")}>
            아이콘 디자인 소스 정보
          </button>
        </div>
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
