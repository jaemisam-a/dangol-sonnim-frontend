import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Close from "public/icons/close/close.svg";
import EditOnlyPencil from "public/icons/editOnlyPencil.svg";

type MenuProps = {
  imgSrc: string;
  name: string;
  price: number;
  isBottom: boolean;
  isOwner?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  editAction?: () => void;
  deleteAction?: () => void;
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

const imageWrapper = css`
  position: relative;
`;

const btnOnImg = css`
  position: absolute;
  padding: 0.5rem;
  background-color: ${Colors.amber50};
  border-radius: 5rem;
  width: 2.5rem;
  height: 2.5rem;
  top: 1.75rem;
  left: 1.75rem;
`;

const MenuCard = (props: MenuProps) => {
  return (
    <>
      <div>
        <div css={imageWrapper}>
          <Image
            css={menuImage(props.isBottom)}
            src={props.imgSrc}
            alt={props.name}
            width={props.isBottom ? 152 : 96}
            height={props.isBottom ? 152 : 96}
          />
          {props.isEdit && (
            <button css={btnOnImg} onClick={props.editAction}>
              <EditOnlyPencil stroke={Colors.white} />
            </button>
          )}
          {props.isDelete && (
            <button css={btnOnImg} onClick={props.deleteAction}>
              <Close width={24} height={24} stroke={Colors.white} />
            </button>
          )}
        </div>
        <div css={menuName}>{props.name}</div>
        <div css={menuPrice}>{props.price.toLocaleString("ko-KR")}원</div>
      </div>
    </>
  );
};

export default MenuCard;
