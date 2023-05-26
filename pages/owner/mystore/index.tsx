import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import { useQuery } from "react-query";

import Layout from "common/layout";
import FormLabel from "common/formLabel";
import ServiceTags from "owner/store/serviceTags";
import BusinessHour from "owner/store/businessHour";
import { categories } from "src/utils/category";
import { Colors, fullAmberButtonStyle, selectStyle, Texts } from "styles/common";
import Search from "public/icons/etc/search.svg";
import useMyStoreInfo from "src/store/storeInfo";
import useCurrentStore from "src/store/currentStore";
import { getStoreInfo } from "pages/api/owner/dangolStore";

const formWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem 3rem;
`;

const inputStyle = css`
  ${Texts.B3_15_R1}
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.688rem 0.75rem;
  border: 1px solid ${Colors.neutral30};
  border-radius: 0.25rem;
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
  const {
    name,
    categoryType,
    comments,
    newAddress,
    sido,
    sigungu,
    bname1,
    detailedAddress,
    businessHours,
    tags,
    setGlobalStoreInfo,
  } = useStore(useMyStoreInfo);
  const { currentStoreId } = useStore(useCurrentStore);

  const [isFilled, setIsFilled] = useState(false);

  const { data: originalStoreInfo } = useQuery("storeInfo", () => getStoreInfo(currentStoreId), {
    enabled: Boolean(query.isEdit),
  });

  const goToBusinessAuth = () => {
    push(
      {
        pathname: "/owner/auth",
        query: { accessToken: localStorage.getItem("accessToken"), isEdit: query.isEdit },
      },
      "owner/auth"
    );
  };

  const getAddress = () => {
    push(
      {
        pathname: "/owner/settings/location",
        query: {
          returnPath: pathname,
          isEdit: query.isEdit,
        },
      },
      "/owner/settings/location"
    );
  };

  useEffect(() => {
    /** 현재 페이지의 각 섹션 빈칸 확인 */
    const isEachSectionFilled = [
      name,
      categoryType,
      comments,
      newAddress,
      sido,
      sigungu,
      bname1,
      businessHours,
      tags,
    ].every((el) => el !== "" && el.length !== 0);

    /** 영업 시간 섹션의 빈칸 확인 */
    const isBHourFilled = businessHours.every((el, idx) => {
      if (idx === 0 || idx !== businessHours.length - 1) {
        /** 마지막 칸이 아니라면 빈칸을 허용하지 않는다. */
        return el.weeks !== "" && el.hours !== "";
      } else {
        /** 마지막은 모두 비어있거나 모두 입력되어야한다. */
        return (el.weeks === "" && el.hours === "") || (el.hours !== "" && el.weeks !== "");
      }
    });
    setIsFilled(isEachSectionFilled && isBHourFilled);
  }, [name, categoryType, comments, newAddress, sido, sigungu, bname1, businessHours, tags]);

  useEffect(() => {
    const keyNameArr = [
      "name",
      "categoryType",
      "comments",
      "newAddress",
      "sido",
      "sigungu",
      "bname1",
      "detailedAddress",
      "businessHours",
      "tags",
      "registerNumber",
    ];

    if (!originalStoreInfo) return;
    if (query.isEdit && !query.address) {
      keyNameArr.forEach((key) => setGlobalStoreInfo(key, originalStoreInfo[key]));
    }
  }, [originalStoreInfo]);

  return (
    <Layout
      title={query.isEdit ? "가게 정보 수정" : "가게 정보 등록"}
      subTitle={query.isEdit ? "가게 정보 수정" : "가게 정보 등록"}
    >
      <form css={formWrapper}>
        <FormLabel label="가게명">
          <input
            type="text"
            css={inputStyle}
            value={name}
            onChange={(e) => setGlobalStoreInfo("name", e.target.value)}
          />
        </FormLabel>
        <FormLabel label="가게 카테고리">
          <select
            css={selectStyle}
            onChange={(e) => setGlobalStoreInfo("categoryType", e.target.value)}
            value={categoryType}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormLabel>
        <FormLabel label="가게 한줄 소개">
          <input
            type="text"
            css={inputStyle}
            placeholder="가게 한줄 소개 입력"
            value={comments}
            onChange={(e) => setGlobalStoreInfo("comments", e.target.value)}
          />
        </FormLabel>
        <FormLabel label="위치">
          <div css={addressSearch}>
            <input
              type="text"
              placeholder="주소 검색"
              onFocus={getAddress}
              value={newAddress}
              readOnly
            />
            <button onClick={getAddress} type={"button"}>
              <Search width={24} height={24} stroke={Colors.amber50} />
            </button>
          </div>
          <input
            type="text"
            css={inputStyle}
            value={detailedAddress}
            onChange={(e) => setGlobalStoreInfo("detailedAddress", e.target.value)}
          />
        </FormLabel>
        <FormLabel label="영업시간">
          <BusinessHour />
        </FormLabel>
        <FormLabel label="서비스 태그">
          <ServiceTags />
        </FormLabel>
        <button
          type="button"
          onClick={goToBusinessAuth}
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
