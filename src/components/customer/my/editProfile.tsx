import React, { FormEvent, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

import { Colors, Texts } from "styles/common";
import Avatar from "common/avatar";
import InputWithButton, { InputWithButtonType } from "common/input/withButton";
import Modal from "common/modal";
import { InputStatus } from "common/input/text";
import Spinner from "common/spinner";
import Dialog from "customer/my/dialog";
import useLoginStore from "src/store/userLogin";
import { deleteUser, getIsValidName, getUserInfo, updateUser } from "pages/api/user";

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

const submit = (isOkay: boolean) => css`
  width: 100%;
  padding: 0.688rem 0;
  background-color: ${isOkay ? Colors.amber50 : Colors.neutral20};
  border-radius: 0.25rem;
  cursor: ${isOkay ? "pointer" : "not-allowed"};
  color: ${isOkay ? Colors.white : Colors.neutral50};
  ${Texts.S3_18_M}
`;

const EditProfile = () => {
  const { push, reload } = useRouter();
  const { logout } = useLoginStore();

  const { data, isFetching } = useQuery("userInf", getUserInfo, { refetchOnWindowFocus: false });
  const { mutateAsync: checkValidName } = useMutation("validName", () =>
    getIsValidName(profileData.name)
  );
  const { mutateAsync } = useMutation(deleteUser);
  const { mutateAsync: updateUserMutate } = useMutation(updateUser);

  const [openModal, setOpenModal] = useState(false);
  const [inputStatus, setInputStatus] = useState<InputStatus[]>(["", ""]);
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    phoneAuth: "",
    imageUrl: "",
  });
  const [inputArr, setInputArr] = useState<InputWithButtonType[]>([]);
  const [image, setImage] = useState<File>();

  const checkValid = () => {
    if (!profileData.name) return alert("닉네임을 입력하세요.");
    checkValidName()
      .then(() => {
        setInputStatus((prev) => ["success", prev[1]]);
      })
      .catch((err) => {
        alert(err?.response?.data.message);
        setInputStatus((prev) => ["error", prev[1]]);
      });
  };

  const updateInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profileData.name !== data?.nickname && inputStatus[0] !== "success")
      return alert("닉네임 중복확인을 해주세요.");
    if (inputStatus[0] === "error") return alert("사용가능한 닉네임을 입력해주세요.");
    updateUserMutate({
      nickname: profileData.name,
      phoneNumber: profileData.phone,
      multipartFile: image,
    }).then(() => {
      alert("저장되었습니다.");
      reload();
    });
  };

  useEffect(() => {
    setInputArr([
      {
        label: "닉네임",
        placeholder: "닉네임 입력",
        btnName: "중복확인",
        isRequired: false,
        btnAction: checkValid,
        inputStatusMessage: { success: "사용가능한 닉네임입니다.", error: "중복된 닉네임입니다." },
        objectKey: "name",
        type: "text",
        minValue: 2,
        maxValue: 12,
      },
      {
        label: "휴대폰 번호",
        placeholder: "휴대폰 번호 입력('-'제외)",
        isRequired: false,
        objectKey: "phone",
        type: "number",
        minValue: 11,
        maxValue: 11,
      },
    ]);
  }, []);

  useEffect(() => {
    setInputArr((prev) => [{ ...prev[0], btnAction: checkValid }, prev[1]]);
  }, [profileData]);

  useEffect(() => {
    setInputStatus((prev) => ["", prev[1]]);
  }, [profileData.name]);

  useEffect(() => {
    if (!data) return;
    setProfileData({
      name: data.nickname,
      phone: data.phoneNumber,
      phoneAuth: "",
      imageUrl: "",
    });
  }, [data]);

  if (isFetching) return <Spinner />;

  return (
    <>
      <form onSubmit={updateInfo} css={wrapper}>
        <Avatar imageUrl={data?.profileImageUrl} setImage={setImage} />
        <div css={inputList}>
          {inputArr.map((el, idx) => (
            <InputWithButton
              label={el.label}
              placeholder={el.placeholder}
              btnName={el.btnName}
              isInBottomSheet={true}
              key={idx}
              isRequired={el.isRequired}
              inputStatus={inputStatus[idx]}
              btnAction={el.btnAction}
              inputStatusMessage={el.inputStatusMessage}
              setState={setProfileData}
              objectKey={el.objectKey}
              isHidden={el.isHidden}
              state={profileData[el.objectKey as "name" | "phone" | "phoneAuth"]}
              type={el.type as "text" | "number"}
              minValue={el.minValue}
              maxValue={el.maxValue}
            />
          ))}
        </div>
        <button
          type="submit"
          css={submit(profileData.name !== data?.nickname ? inputStatus[0] === "success" : true)}
          disabled={!(profileData.name !== data?.nickname ? inputStatus[0] === "success" : true)}
        >
          저장
        </button>
        <div css={btnWrapper}>
          <div>
            <button
              type="button"
              onClick={() => {
                logout();
                push("/");
              }}
            >
              로그아웃
            </button>
            <span css={btnDivider}>|</span>
            <button type="button" onClick={() => setOpenModal(true)}>
              회원탈퇴
            </button>
          </div>
          <button type="button" css={iconInfo} onClick={() => push("/source")}>
            아이콘 디자인 소스 정보
          </button>
        </div>
      </form>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <Dialog
          content={{
            usage: "withdrawal",
            buttonText: { confirm: "탈퇴하기", cancel: "혜택 계속 사용하기" },
            name: data?.nickname,
          }}
          onCancel={() => setOpenModal(false)}
          onConfirm={() =>
            mutateAsync().then(() => {
              alert("탈퇴처리되었습니다.");
              push("/");
              localStorage.removeItem("userAccessToken");
            })
          }
        />
      </Modal>
    </>
  );
};

export default EditProfile;
