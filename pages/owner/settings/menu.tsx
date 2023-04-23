import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import ImageManage from "common/imageManage";
import InputWithButton, { InputWithButtonType } from "common/input/withButton";
import Layout from "common/layout";
import { createMenu, getMenu, updateMenu } from "pages/api/owner/menu";

const wrapper = css`
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SettingsMenu = () => {
  const { query, back } = useRouter();

  const { data, isError } = useQuery("menu", () => getMenu(Number(query?.menuId)), {
    enabled: Boolean(query?.menuId),
  });
  const { mutateAsync: create } = useMutation(createMenu);
  const { mutateAsync: update } = useMutation(updateMenu);

  const [inputData, setInputData] = useState({ name: "", price: "" });
  const [image, setImage] = useState<File>();

  const isEdit = Boolean(query?.menuId);

  const inputArr: InputWithButtonType[] = [
    { label: "메뉴명", type: "text", placeholder: "메뉴명 입력", objectKey: "name" },
    { label: "가격", type: "number", placeholder: "가격 입력", objectKey: "price" },
  ];

  const handleSubmit = () => {
    if (isEdit) {
      update({
        menuId: Number(query?.menuId),
        name: inputData.name,
        price: parseInt(inputData.price),
        multipartFile: image as File,
      })
        .then(() => back())
        .catch((err) => console.log(err.response.data.message));
    } else {
      create({
        storeId: 1,
        name: inputData.name,
        price: parseInt(inputData.price),
        multipartFile: image as File,
      })
        .then(() => back())
        .catch((err) => console.log(err.response.data.message));
    }
  };

  useEffect(() => {
    if (isError) back();
    // TODO: 메뉴 조회에서 데이터 받아와 아래에 적용
  }, [query]);

  // 메뉴 조회에서 에러가 발생했다면 정상적인 방법으로 접근한 것이 아님
  if (isError) return null;

  return (
    <Layout
      title="메뉴 관리"
      subTitle={isEdit ? "메뉴 수정" : "메뉴 등록"}
      isXButton={true}
      checkBtnFnc={handleSubmit}
    >
      <div css={wrapper}>
        <ImageManage setImage={setImage as Dispatch<SetStateAction<File>>} />
        <div css={inputWrapper}>
          {inputArr.map((el) => (
            <InputWithButton
              key={el.label}
              label={el.label}
              placeholder={el.placeholder}
              isInBottomSheet={false}
              state={inputData[el.objectKey as "name" | "price"]}
              setState={setInputData}
              type={el.type}
              isRequired={true}
              objectKey={el.objectKey}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsMenu;
