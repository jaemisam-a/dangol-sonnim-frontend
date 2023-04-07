import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import ImageManage from "common/imageManage";
import InputWithButton, { InputWithButtonType } from "common/input/withButton";
import Layout from "common/layout";

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
  const { query } = useRouter();
  const [inputData, setInputData] = useState({ name: "", price: "" });

  const isEdit = Boolean(query?.menuId);

  const inputArr: InputWithButtonType[] = [
    { label: "메뉴명", type: "text", placeholder: "메뉴명 입력", objectKey: "name" },
    { label: "가격", type: "number", placeholder: "가격 입력", objectKey: "price" },
  ];

  useEffect(() => {
    // TODO: 수정중일 시 메뉴 데이터 받아와 inputData에 값 넣는 로직 추가
  }, [query]);

  return (
    <Layout
      title="메뉴 관리"
      subTitle={isEdit ? "메뉴 수정" : "메뉴 등록"}
      isXButton={true}
      checkBtnFnc={() => {}}
    >
      <div css={wrapper}>
        <ImageManage />
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
