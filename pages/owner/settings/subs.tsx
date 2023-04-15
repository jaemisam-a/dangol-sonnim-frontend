import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import Layout from "common/layout";
import SubsForm from "owner/settings/subsForm";
import { addSubsCoupon } from "pages/api/owner/subs";

export type subsType = {
  name: string;
  type: "COUNT" | "MONTHLY";
  count: number;
  price: number;
  benefit: string;
  isMain: boolean;
};

const Subs = () => {
  const { query, back } = useRouter();

  const { mutateAsync } = useMutation(addSubsCoupon);

  const [subsContent, setSubsContent] = useState<subsType>({
    name: "",
    type: "MONTHLY",
    count: 0,
    price: 0,
    benefit: "",
    isMain: true,
  });
  const isEdit = Boolean(query?.subsId);

  const addSubs = () => {
    mutateAsync({
      name: subsContent.name,
      type: subsContent.type,
      intro: subsContent.benefit,
      isTop: subsContent.isMain,
      price: subsContent.price,
      useCount: subsContent.count,
      // FIXME: 가게 id를 query로 받아 적용
      storeId: 1,
    })
      .then(() => {
        alert("등록되었습니다");
        back();
      })
      .catch((err) => alert(err.response.data?.message));
  };

  return (
    <Layout
      title="메뉴 관리"
      subTitle={isEdit ? "구독권 수정" : "구독권 등록"}
      isXButton={true}
      checkBtnFnc={addSubs}
    >
      <SubsForm isEdit={isEdit} subsContent={subsContent} setSubsContent={setSubsContent} />
    </Layout>
  );
};

export default Subs;
