import React, { useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Tag from "customer/components/common/Tag";
import Pick from "public/icons/Pick";

const StoreThumbnail = () => {
  const [isPick, setIsPick] = useState(false);

  const dummy = [
    {
      id: 1,
      store: "더본즈피자",
      category: "양식",
      tags: ["사이드 디쉬 추가", "사이즈업"],
      location: "구로구 가리봉동",
      img: "/images/dummy/pizza.png",
    },
  ];

  const IMG_SIZE = 152;

  const thumbnailStyle = css`
    cursor: pointer;
  `;

  const imgWrapper = css`
    position: relative;
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
    // Todo : 찜한 가게 저장
  };
  return (
    <>
      <div key={dummy[0].id} css={thumbnailStyle}>
        <div css={imgWrapper}>
          <Image
            src={dummy[0].img}
            alt={dummy[0].store}
            width={IMG_SIZE}
            height={IMG_SIZE}
            css={imgStyle}
          />
          <button css={btnStyle} onClick={onPickClick}>
            <Pick isPick={isPick} />
          </button>
        </div>
        <div>
          <span css={storeStyle}>{dummy[0].store}</span>
          <span css={categoryStyle}>{dummy[0].category}</span>
        </div>
        <div css={tagStyle}>
          {dummy[0].tags.map((tag) => (
            <Tag text={tag} key={tag} />
          ))}
        </div>
        <span css={locationStyle}>{dummy[0].location}</span>
      </div>
    </>
  );
};

export default StoreThumbnail;
