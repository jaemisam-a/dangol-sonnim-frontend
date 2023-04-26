import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useStore } from "zustand";

import Layout from "common/layout";
import { Colors, Texts } from "styles/common";
import Check from "public/icons/check/check.svg";
import { createDangolStore } from "pages/api/owner/dangolStore";
import useMyStoreInfo from "src/store/storeInfo";

const wrapper = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 14.25rem 2.375rem 0;
`;

const text = css`
  h1 {
    ${Texts.H1_20_B}
  }
  svg {
    margin-top: 1.25rem;
    margin-bottom: 3.25rem;
  }
`;

const link = css`
  ${Texts.S3_18_M}
  background-color: ${Colors.amber50};
  color: ${Colors.white};
  padding: 0.938rem 0;
  border-radius: 0.25rem;
`;

const Complete = () => {
  const { query, push, back } = useRouter();
  const { mutateAsync } = useMutation(createDangolStore);

  const globalState = useStore(useMyStoreInfo);
  const { resetStoreInfo } = useStore(useMyStoreInfo);

  const createStore = async () => {
    const trimmedBHourArr = globalState.businessHours.filter(
      (el) => el.weeks !== "" && el.hours !== ""
    );
    await mutateAsync({
      name: globalState.name,
      phoneNumber: "01012345671", // TODO: 사장님 정보에서 전화번호 가져오기
      newAddress: globalState.roadAddr,
      sido: globalState.siNm,
      sigungu: globalState.sggNm,
      bname1: globalState.emdNm,
      bname2: "",
      detailedAddress: globalState.detailedAddress,
      comments: globalState.description,
      businessHours: trimmedBHourArr,
      tags: globalState.tags,
      categoryType: globalState.category,
      registerNumber: globalState.registerNumber,
      registerName: globalState.name,
    })
      .then(() => {
        alert("가게 등록 완료!");
        resetStoreInfo();
        push("/owner");
      })
      .catch((err) => alert(err.response.data.message));
  };

  useEffect(() => {
    if (!query.accessToken) {
      back();
    }
  }, []);

  if (!query.accessToken) return null;

  return (
    <Layout title="사업자 등록" subTitle="사업자 등록">
      <div css={wrapper}>
        <div css={text}>
          <h1>인증이 완료되었습니다</h1>
          <Check width={55} height={55} fill={Colors.green50} />
        </div>
        <button onClick={createStore} css={link}>
          가게 등록하기
        </button>
      </div>
    </Layout>
  );
};

export default Complete;
