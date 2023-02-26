import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Texts } from "styles/common";
import CountTag from "common/CountTag";

type QRCheckProps = {
  qrImg: string;
  storeName: string;
  useCount: string;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4.75rem 1.25rem 8.875rem 1.25rem;
`;

const title = css`
  ${Texts.H1_20_B}
  margin-bottom: 1rem;
`;

const imgStyle = css`
  margin-bottom: 1.25rem;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
`;

const QRCheck = (props: QRCheckProps) => {
  return (
    <div css={wrapper}>
      <h1 css={title}>{props.storeName}</h1>
      <Image src={props.qrImg} alt="QR코드이미지" width={320} height={320} css={imgStyle} />
      <CountTag useCount={props.useCount} prefix="구독권" />
    </div>
  );
};

export default QRCheck;
