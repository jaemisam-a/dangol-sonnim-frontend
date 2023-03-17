import Image from "next/image";
import React from "react";
import { css } from "@emotion/react";

import { ThumbnailData } from "common/storeThumbnail";
import Tag from "common/tag/tagCustomer";
import { Colors, Texts } from "styles/common";

type StoreThumbnailProps = {
  content: ThumbnailData;
};

const wrapper = css`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  cursor: default;
`;

const storeInfo = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const store = css`
  ${Texts.S1_16_B}
`;

const category = css`
  ${Texts.B2_14_R2}
  color: ${Colors.neutral60};
`;

const location = css`
  ${Texts.C2_12_R}
  color: ${Colors.neutral70};
`;

const tags = css`
  display: flex;
  gap: 0.25rem;
  margin: 0.25rem 0;
`;

const PaymentStoreInfo = ({ content }: StoreThumbnailProps) => {
  return (
    <div css={wrapper}>
      <Image src={content.img} alt={content.store} width={83} height={83} />
      <div>
        <div css={storeInfo}>
          <span css={store}>{content.store}</span>
          <span css={category}>{content.category}</span>
        </div>
        <div css={tags}>
          {content.tags.map((tag) => (
            <Tag text={tag} key={tag} />
          ))}
        </div>
        <span css={location}>{content.shortAddress}</span>
      </div>
    </div>
  );
};

export default PaymentStoreInfo;
