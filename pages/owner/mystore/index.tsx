import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import Layout from "common/layout";
import FormLabel from "common/formLabel";
import TextInput from "common/input/text";
import ServiceTags from "owner/store/serviceTags";
import { categories } from "src/utils/category";
import { Colors, fullAmberButtonStyle, selectStyle, Texts } from "styles/common";
import Search from "public/icons/etc/search.svg";

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
  const { push, pathname, query } = useRouter();

  const [storeInfo, setStoreInfo] = useState({
    name: "",
    category: "1",
    description: "",
    roadAddr: "",
    siNm: "",
    sggNm: "",
    emdNm: "",
    detailedAddress: "",
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

  useEffect(() => {
    if (query.address) {
      const address = JSON.parse(query.address as string);
      Object.keys(address).forEach((key) =>
        setStoreInfo((prev) => ({ ...prev, [key]: address[key] }))
      );
    }
  }, [query.address]);

  const getAddress = () => {
    push(
      { pathname: "/owner/settings/location", query: { returnPath: pathname } },
      "owner/settings/location"
    );
  };

  return (
    <Layout title="가게 정보 등록" subTitle="가게 정보 등록">
      <form css={formWrapper}>
        <FormLabel label="가게명">
          <TextInput type="text" state={storeInfo.name} objectKey="name" setState={setStoreInfo} />
        </FormLabel>
        <FormLabel label="가게 카테고리">
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
        </FormLabel>
        <FormLabel label="가게 한줄 소개">
          <TextInput
            type="text"
            placeholder="가게 한줄 소개 입력"
            state={storeInfo.description}
            objectKey="description"
            setState={setStoreInfo}
          />
        </FormLabel>
        <FormLabel label="위치">
          <div css={addressSearch}>
            <input
              type="text"
              placeholder="주소 검색"
              onFocus={getAddress}
              defaultValue={storeInfo.roadAddr}
            />
            <button onClick={getAddress}>
              <Search width={24} height={24} stroke={Colors.amber50} />
            </button>
          </div>
          <TextInput
            type="text"
            placeholder="상세주소"
            objectKey="detailedAddress"
            state={storeInfo.detailedAddress}
            setState={setStoreInfo}
          />
        </FormLabel>
        <FormLabel label="영업시간">
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
        </FormLabel>
        <FormLabel label="서비스 태그">
          <ServiceTags setStoreInfo={setStoreInfo} />
        </FormLabel>
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
