import React, { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Tag from "common/Tag";
import Pick from "public/icons/Pick.svg";

export type ThumbnailData = {
  id: string;
  store: string;
  category: string;
  tags: string[];
  shortAddress: string;
  img: string;
};

type StoreThumbnailProps = {
  content: ThumbnailData;
  isPick?: boolean;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  cursor: pointer;

  img {
    border-radius: 0.25rem;
  }
`;

const storeInfo = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const store = css`
  ${Texts.B3_15_R2}
`;

const category = css`
  ${Texts.C2_12_R}
  color: ${Colors.neutral60};
`;

const location = css`
  ${Texts.C2_12_R}
  color: ${Colors.neutral70};
`;

const tags = css`
  display: flex;
  gap: 0.25rem;
`;

const imageWrapper = css`
  position: relative;
`;

const pickBtn = (isPick: boolean | undefined) => css`
  background-color: transparent;
  position: absolute;
  bottom: 3px;
  right: 0.25rem;

  svg {
    stroke: ${isPick ? Colors.red40 : Colors.white};
    fill: ${isPick ? Colors.red40 : ""};
  }
`;

const StoreThumbnail = ({ content, isPick }: StoreThumbnailProps) => {
  const { push } = useRouter();

  const onPickClick = (e: MouseEvent) => {
    // TODO: 찜하기 기능
    e.stopPropagation();
    alert("찜하기");
  };
  return (
    <>
      <div css={wrapper} onClick={() => push(`/store/${content.id}`)}>
        <div css={imageWrapper}>
          <Image src={content.img} alt={content.store} width={152} height={152} />
          <button css={pickBtn(isPick)} onClick={onPickClick}>
            <Pick />
          </button>
        </div>
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
    </>
  );
};

export default StoreThumbnail;
