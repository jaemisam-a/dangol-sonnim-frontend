import React, { Dispatch, SetStateAction, useId } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Checkbox from "common/input/Checkbox";

type StoreCouponProps = {
  id: string;
  name: string;
  storeName: string;
  count: number;
  description: string;
  price: number;
  checked?: boolean;
  setChecked?: Dispatch<SetStateAction<any>>;
  disable?: boolean;
};

const wrapper = css`
  display: flex;
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 8px;
  padding: 0.375rem 0.75rem;
  gap: 0.5rem;
  align-items: center;
`;

const contentsWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const contentsTopWrapper = css`
  height: 4.875rem;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${Colors.neutral70};
  ${Texts.C2_12_R}
`;

const price = css`
  text-align: end;
  ${Texts.B3_15_M1}
`;

const StoreCoupon = (props: StoreCouponProps) => {
  const checkboxId = useId();

  return (
    <>
      <div css={wrapper}>
        <Checkbox
          forId={checkboxId}
          setIsChecked={props.setChecked}
          isChecked={props.checked}
          disable={props.disable}
          objectKey={props.id}
        />
        <label htmlFor={checkboxId} css={contentsWrapper}>
          <div css={contentsTopWrapper}>
            <div css={storeName}>{props.storeName}</div>
            <div css={subsName}>
              {props.name}({props.count}νκΆ)
            </div>
            <div css={description}>{props.description}</div>
          </div>
          <div css={price}>μ {props.price.toLocaleString("ko-KR")}μ</div>
        </label>
      </div>
    </>
  );
};

export default StoreCoupon;
