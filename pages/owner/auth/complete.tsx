import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Layout from "common/layout";
import { Colors, Texts } from "styles/common";
import Check from "public/icons/check/check.svg";
import { createDangolStore } from "pages/api/owner/dangolStore";

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
  const { query, push } = useRouter();
  const { mutateAsync } = useMutation(createDangolStore);

  const createStore = async () => {
    await mutateAsync({
      name: query.name as string,
      phoneNumber: "01012345671", // TODO: 사장님 정보에서 전화번호 가져오기
      newAddress: query.newAddress as string,
      sido: query.sido as string,
      sigungu: query.sigungu as string,
      bname1: query.bname1 as string,
      bname2: "",
      detailedAddress: query.detailedAddress as string,
      comments: query.comments as string,
      businessHours: JSON.parse(query.businessHours as string),
      tags: query.tags as string[],
      categoryType: query.categoryType as string,
      registerNumber: query.registerNumber as string,
      registerName: query.registerName as string,
    })
      .then(() => push("/owner"))
      .catch((err) => alert(err.response.data.message));
  };

  useEffect(() => {
    if (!query.name) push("/owner/login");
  }, []);

  if (!query.name) return null;

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
