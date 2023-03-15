import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import TextInput from "common/input/Text";
import InfoFormItem from "owner/store/infoFormItem";
import ServiceTags from "owner/store/serviceTags";
import { categories } from "src/utils/category";
import { Colors, fullAmberButtonStyle, selectStyle, Texts } from "styles/common";
import Search from "public/icons/etc/Search.svg";

const formWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem 3rem;
`;

const addressSearch = css`
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  border: 1px ${Colors.neutral30} solid;
  border-radius: 0.25rem;

  :focus-within {
    outline: 1px solid ${Colors.amber50};
  }

  input {
    ${Texts.B3_15_R1}
    width: 100%;
    padding: 0.688rem 0.75rem;
    outline: none;
    border: none;
  }

  svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const openHourWrapper = css`
  display: flex;
  gap: 1rem;

  div {
    min-width: 0;
  }
`;

const openDayStyle = css`
  flex-basis: 30%;
  flex-grow: 0;
`;

const openTimeStyle = css`
  flex-basis: 70%;
  flex-grow: 0;
`;

const buttonStyle = (isFilled: boolean) => css`
  margin: 0.75rem 0 3rem;
  cursor: ${isFilled ? "pointer" : "default"};
  color: ${isFilled ? Colors.white : Colors.neutral50};
  background-color: ${isFilled ? Colors.amber50 : Colors.neutral20};
  ${Texts.S3_18_M}
`;

const MyStoreSetting = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    category: "1",
    description: "",
    address: "",
    openDay: "",
    openTime: "",
    tags: [""],
  });
  const [isFilled, setIsFilled] = useState(false);

  const addStoreInfo = () => {
    // TODO: 가게 정보 저장
  };

  useEffect(() => {
    setIsFilled(Object.values(storeInfo).every((el) => el !== "" && el.length !== 0));
  }, [storeInfo]);

  return (
    <Layout title="가게 정보 등록" subTitle="가게 정보 등록">
      <form css={formWrapper}>
        <InfoFormItem label="가게명">
          <TextInput
            type="text"
            placeholder="가게명 입력"
            state={storeInfo.name}
            objectKey="name"
            setState={setStoreInfo}
          />
        </InfoFormItem>
        <InfoFormItem label="가게 카테고리">
          <select
            css={selectStyle}
            onChange={(e) => setStoreInfo((prev) => ({ ...prev, category: e.target.value }))}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </InfoFormItem>
        <InfoFormItem label="가게 한줄 소개">
          <TextInput
            type="text"
            placeholder="가게 한줄 소개 입력"
            state={storeInfo.description}
            objectKey="description"
            setState={setStoreInfo}
          />
        </InfoFormItem>
        <InfoFormItem label="위치">
          <div css={addressSearch}>
            <input
              type="text"
              placeholder="주소 검색"
              onFocus={() => {
                // TODO: 주소 검색 페이지로 이동
              }}
            />
            <Search width={24} height={24} stroke={Colors.amber50} />
          </div>
          <TextInput
            type="text"
            placeholder="상세주소"
            objectKey="address"
            state={storeInfo.address}
            setState={setStoreInfo}
          />
        </InfoFormItem>
        <InfoFormItem label="영업시간">
          <div css={openHourWrapper}>
            <div css={openDayStyle}>
              <TextInput
                type="text"
                state={storeInfo.openDay}
                setState={setStoreInfo}
                objectKey="openDay"
                placeholder="요일"
                css={openDayStyle}
              />
            </div>
            <div css={openTimeStyle}>
              <TextInput
                type="text"
                state={storeInfo.openTime}
                setState={setStoreInfo}
                objectKey="openTime"
                placeholder="영업시간"
                css={openTimeStyle}
              />
            </div>
          </div>
        </InfoFormItem>
        <InfoFormItem label="서비스 태그">
          <ServiceTags setStoreInfo={setStoreInfo} />
        </InfoFormItem>
        <button
          type="button"
          onClick={addStoreInfo}
          disabled={!isFilled}
          css={[fullAmberButtonStyle, buttonStyle(isFilled)]}
        >
          확인
        </button>
      </form>
    </Layout>
  );
};

export default MyStoreSetting;
