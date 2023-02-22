import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Tag from "common/Tag";

export type ThumbnailData = {
  id: string;
  store: string;
  category: string;
  tags: string[];
  location: string;
  img: string;
};

type StoreThumbnailProps = {
  content: ThumbnailData;
  isLarge: boolean;
};

const wrapper = (isLarge: boolean) => css`
  display: flex;
  flex-direction: ${isLarge ? "column" : "row"};
  gap: ${isLarge ? "0.375rem" : "0.75rem"};
  cursor: ${isLarge ? "pointer" : "default"};

  img {
    border-radius: ${isLarge ? "0.25rem" : "0"};
  }
`;

const storeInfo = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const store = (isLarge: boolean) => css`
  ${isLarge ? Texts.B3_15_R2 : Texts.S1_16_B}
`;

const category = (isLarge: boolean) => css`
  ${isLarge ? Texts.C2_12_R : Texts.B2_14_R2}
  color: ${Colors.neutral60};
`;

const location = css`
  ${Texts.C2_12_R}
  color: ${Colors.neutral70};
`;

const tags = (isLarge: boolean) => css`
  display: flex;
  gap: 0.25rem;
  margin: ${isLarge ? "" : "0.25rem 0"};
`;

const StoreThumbnail = ({ content, isLarge }: StoreThumbnailProps) => {
  const IMG_SIZE = isLarge ? 152 : 83;

  return (
    <>
      <div css={wrapper(isLarge)}>
        <Image src={content.img} alt={content.store} width={IMG_SIZE} height={IMG_SIZE} />
        <div>
          <div css={storeInfo}>
            <span css={store(isLarge)}>{content.store}</span>
            <span css={category(isLarge)}>{content.category}</span>
          </div>
          <div css={tags(isLarge)}>
            {content.tags.map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
          </div>
          <span css={location}>{content.location}</span>
        </div>
      </div>
    </>
  );
};

export default StoreThumbnail;
