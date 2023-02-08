import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Layout from "customer/components/common/layout";
import Dialog from "customer/components/mypage/Dialog";

const highlight = css`
  color: ${Colors.amber50};
  ${Texts.B3_15_B}
`;
const addText = css`
  ${Texts.B3_15_R2}
`;

// Review용 (Modal 완성되면 삭제정예정)
const test = css`
  background-color: grey;
  padding: 2rem;
`;

const dialogContent = [
  {
    usage: "withdrawal" as const,
    id: "aaa1234",
    name: "물고기1234",
    additionalText: (
      <div css={addText}>
        단골손님에서 <span css={highlight}>더 많은 혜택</span>들이 기다리고 있어요!
      </div>
    ),
    buttonText: { left: "탈퇴하기", right: "혜택 계속 사용하기" },
  },
  {
    usage: "unsubscribe" as const,
    id: "aaa1234",
    name: "물고기1234",
    buttonText: { left: "구독 해지하기", right: "구독 유지하기" },
  },
];
const My = () => {
  const onConfirm = () => {};
  const onCancel = () => {};
  return (
    <>
      <Layout title="마이페이지" subTitle="마이페이지">
        <div css={test}>
          <Dialog content={dialogContent[0]} onConfirm={onConfirm} onCancel={onCancel} />
          <br />
          <Dialog content={dialogContent[1]} onConfirm={onConfirm} onCancel={onCancel} />
        </div>
      </Layout>
    </>
  );
};

export default My;
