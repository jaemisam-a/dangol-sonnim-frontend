import React, { useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Tag from "customer/components/common/Tag";
import Pick from "public/icons/Pick";

export type ThumbnailData = {
  id: string;
  store: string;
  category: string;
  tags: string[];
  location: string;
  img: string;
};

type ThumbnailProps = {
  content: ThumbnailData;
};

const StoreThumbnail = ({ content }: ThumbnailProps) => {
  const [isPick, setIsPick] = useState(false);

  const IMG_SIZE = 152;

  const thumbnailStyle = css`
    cursor: pointer;
    width: fit-content;
  `;

  const imgWrapper = css`
    position: relative;
    margin-bottom: 6px;
    width: ${IMG_SIZE}px;
    height: ${IMG_SIZE}px;
  `;

  const imgStyle = css`
    border-radius: 4px;
  `;

  const btnStyle = css`
    position: absolute;
    right: 4px;
    bottom: 4px;
    background-color: transparent;
    cursor: pointer;
  `;

  const storeStyle = css`
    ${Texts.B3_15_R2}
    margin-right: 4px;
  `;

  const categoryStyle = css`
    ${Texts.C2_12_R}
    color: ${Colors.neutral60};
  `;

  const locationStyle = css`
    ${Texts.C2_12_R}
    color: ${Colors.neutral70};
  `;

  const tagStyle = css`
    display: flex;
    gap: 4px;
  `;

  const onPickClick = () => {
    setIsPick((prev) => !prev);
    // TODO : 찜한 가게 저장
  };
  return (
    <>
      <div css={thumbnailStyle}>
        <div css={imgWrapper}>
          <Image
            src={content.img}
            alt={content.store}
            width={IMG_SIZE}
            height={IMG_SIZE}
            css={imgStyle}
          />
          <button css={btnStyle} onClick={onPickClick}>
            <Pick isPick={isPick} />
          </button>
        </div>
        <div>
          <span css={storeStyle}>{content.store}</span>
          <span css={categoryStyle}>{content.category}</span>
        </div>
        <div css={tagStyle}>
          {content.tags.map((tag) => (
            <Tag text={tag} key={tag} />
          ))}
        </div>
        <span css={locationStyle}>{content.location}</span>
      </div>
    </>
  );
};

export default StoreThumbnail;
