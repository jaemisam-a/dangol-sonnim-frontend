import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import Layout from "common/layout";
import SubsForm from "owner/settings/subsForm";
import { addSubsCoupon } from "pages/api/owner/subs";
import useCurrentStore from "src/store/currentStore";

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
  const { currentStoreId } = useCurrentStore();
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
      price: Number(subsContent.price),
      useCount: Number(subsContent.count),
      storeId: Number(currentStoreId),
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
