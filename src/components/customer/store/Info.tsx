import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";

import { Colors, Texts } from "styles/common";
import Tag from "common/Tag";
import Slider from "common/Slider";
import Pick from "public/icons/Pick.svg";

type InfoProps = {
  infoContent: {
    storeName: string;
    category: string;
    images: { src: string; alt: string }[];
    description: string;
    menu: string;
    isPick: boolean;
  };
  onPick: () => void;
};

const sliderWrapper = css`
  margin-bottom: 0.983rem;
`;

const imgStyle = css`
  width: 9.25rem;
  height: 9.25rem;
  flex-shrink: 0;
`;

const titleWrapper = css`
  display: flex;
  justify-content: space-between;
  padding: 0 1.25rem;
`;

const titleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  h1 {
    ${Texts.H2_21_B}
    margin: 0;
  }

  span {
    ${Texts.B2_14_R1}
    color:${Colors.neutral50}
  }
`;

const pickStyle = css`
  background-color: transparent;
`;

const descriptionStyle = css`
  ${Texts.B1_13_R2}
  color:${Colors.neutral80};
  margin-bottom: 0.5rem;
`;

const divider = css`
  border: solid ${Colors.neutral10} 1px;
  margin: 0 1rem;
`;

const menuStyle = css`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  p {
    ${Texts.B3_15_M2}
  }
`;

const Info = ({
  infoContent: { storeName, category, images, description, menu, isPick },
  onPick,
}: InfoProps) => {
  return (
    <section>
      <div css={sliderWrapper}>
        <Slider gap="0.25rem">
          {images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={148}
              height={148}
              css={imgStyle}
            />
          ))}
        </Slider>
      </div>
      <div css={titleWrapper}>
        <div />
        <div>
          <div css={titleStyle}>
            <h1>{storeName}</h1>
            <span>{category}</span>
          </div>
          <p css={descriptionStyle}>{description}</p>
        </div>
        <button css={pickStyle} onClick={onPick}>
          <Pick
            width={24}
            height={24}
            stroke={isPick ? Colors.red40 : Colors.neutral60}
            fill={isPick ? Colors.red40 : "white"}
          />
        </button>
      </div>
      <hr css={divider} />
      <div css={menuStyle}>
        <Tag text="대표" bgColor={Colors.green50} bold={true} />
        <p>{menu}</p>
      </div>
    </section>
  );
};

export default Info;
