import React, { Dispatch, SetStateAction, useId } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Checkbox from "common/input/checkbox";
import Close from "public/icons/close/close.svg";
import Pencil from "public/icons/etc/pencil.svg";

type StoreCouponProps = {
  id: number;
  name: string;
  storeName: string;
  count: number;
  description: string;
  price: number;
  checked?: any | boolean;
  setChecked?: Dispatch<SetStateAction<any>>;
  disable?: boolean;
  isOwner?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  editAction?: () => void;
  deleteAction?: () => void;
  type: "MONTHLY" | "COUNT";
  isTop?: boolean;
};

const wrapper = (isOwner: boolean) => css`
  display: flex;
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 8px;
  padding: ${isOwner ? "0.75rem 1.625rem" : "0.375rem 0.75rem"};
  gap: 0.5rem;
  align-items: center;
`;

const subsWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const contentWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const texts = css`
  min-height: 4.875rem;
`;

const storeName = css`
  color: ${Colors.neutral90};
  ${Texts.B1_13_R2}
`;

const subsName = css`
  color: ${Colors.amber50};
  ${Texts.S1_16_B}
`;

const description = css`
  color: ${Colors.neutral70};
  ${Texts.C2_12_R}
`;

const price = css`
  text-align: end;
  ${Texts.B3_15_M1}
`;

const buttonStyle = css`
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${Colors.amber50};
  border-radius: 100%;
  margin-top: 1.375rem;
`;

const StoreCoupon = (props: StoreCouponProps) => {
  const checkboxId = useId();

  return (
    <>
      <div css={wrapper(props.isOwner as boolean)}>
        {!props.isOwner && (
          <Checkbox
            forId={checkboxId}
            setIsChecked={props.setChecked}
            isChecked={props.checked}
            disable={props.disable}
            objectKey={String(props.id)}
          />
        )}
        <label htmlFor={checkboxId} css={subsWrapper}>
          <div css={contentWrapper}>
            <div css={texts}>
              <p css={storeName}>
                {props.storeName}
                {props.isTop && "(대표 구독권)"}
              </p>
              <p css={subsName}>
                {props.name}
                {props.type === "COUNT" && `${props.count}회권`}
              </p>
              <p css={description}>{props.description}</p>
            </div>
            {props.isDelete && (
              <button css={buttonStyle} onClick={props.deleteAction}>
                <Close width={24} height={24} stroke={Colors.white} />
              </button>
            )}
            {props.isEdit && (
              <button css={buttonStyle} onClick={props.editAction}>
                <Pencil width={24} height={24} stroke={Colors.white} />
              </button>
            )}
          </div>
          <div css={price}>월 {props.price.toLocaleString("ko-KR")}원</div>
        </label>
      </div>
    </>
  );
};

export default StoreCoupon;
