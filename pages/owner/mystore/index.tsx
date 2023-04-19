import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import Layout from "common/layout";
import FormLabel from "common/formLabel";
import TextInput from "common/input/text";
import ServiceTags from "owner/store/serviceTags";
import { categories } from "src/utils/category";
import { Colors, fullAmberButtonStyle, selectStyle, Texts } from "styles/common";
import Search from "public/icons/etc/search.svg";
import { BHourType, createDangolStore } from "pages/api/owner/dangolStore";
import BusinessHour from "owner/store/businessHour";

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
    category: "KOREAN",
    description: "",
    roadAddr: "",
    siNm: "",
    sggNm: "",
    emdNm: "",
    detailedAddress: "",
    businessHours: [
      {
        weeks: "",
        hours: "",
      },
    ],
    tags: [""],
  });
  const [isFilled, setIsFilled] = useState(false);

  const { mutateAsync } = useMutation(createDangolStore);

  const addStoreInfo = async () => {
    const trimmedBHourArr = storeInfo.businessHours.filter(
      (el) => el.weeks !== "" && el.hours !== ""
    );

    await mutateAsync({
      name: storeInfo.name,
      phoneNumber: "01012345671", // TODO: 사장님 정보에서 전화번호 가져오기
      newAddress: storeInfo.roadAddr,
      sido: storeInfo.siNm,
      sigungu: storeInfo.sggNm,
      bname1: storeInfo.emdNm,
      bname2: "",
      detailedAddress: storeInfo.detailedAddress,
      comments: storeInfo.description,
      businessHours: trimmedBHourArr,
      tags: storeInfo.tags,
      categoryType: storeInfo.category,
      registerNumber: Date.now().toString(), // TODO: 사업자등록번호 가져오기
      registerName: "단골손님",
    })
      .then((res) => console.log(res))
      .catch((err) => alert(err.response.data.message));
  };

  useEffect(() => {
    const isEachSectionFilled = Object.values(storeInfo).every(
      (el) => el !== "" && el.length !== 0
    );

    const isBHourFilled = storeInfo.businessHours.every((el, idx) => {
      if (idx === 0 || idx !== storeInfo.businessHours.length - 1) {
        /** 마지막 칸이 아니라면 빈칸을 허용하지 않는다. */
        return el.weeks !== "" && el.hours !== "";
      } else {
        /** 마지막은 모두 비어있거나 모두 입력되어야한다. */
        return (el.weeks === "" && el.hours === "") || (el.hours !== "" && el.weeks !== "");
      }
    });
    setIsFilled(isEachSectionFilled && isBHourFilled);
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

  const handleBhour = (addedBHour: BHourType[]) => {
    setStoreInfo((prev) => ({ ...prev, businessHours: addedBHour }));
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
            <button onClick={getAddress} type={"button"}>
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
          <BusinessHour bHour={storeInfo.businessHours} handleBhour={handleBhour} />
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
