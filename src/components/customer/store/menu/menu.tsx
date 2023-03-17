import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type MenuProps = {
  imgSrc: string;
  name: string;
  price: number;
  isBottom: boolean;
};

const menuImage = (isBottom: boolean) => css`
  margin-bottom: ${isBottom ? "0.5rem" : "0.25rem"};
  border-radius: 0.25rem;
`;

const menuName = css`
  ${Texts.B3_15_M1}
`;

const menuPrice = css`
  ${Texts.B2_14_M}
  color: ${Colors.neutral70};
`;

const Menu = (props: MenuProps) => {
  return (
    <>
      <div>
        <Image
          css={menuImage(props.isBottom)}
          src={props.imgSrc}
          alt={props.name}
          width={props.isBottom ? 152 : 96}
          height={props.isBottom ? 152 : 96}
        />
        <div css={menuName}>{props.name}</div>
        <div css={menuPrice}>{props.price.toLocaleString("ko-KR")}원</div>
      </div>
    </>
  );
};

export default Menu;
