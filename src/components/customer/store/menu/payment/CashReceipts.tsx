import React, { Dispatch, SetStateAction, useId } from "react";
import { css } from "@emotion/react";

import { CashReceiptsType } from "pages/store/[id]/payment";
import Checkbox from "common/input/Checkbox";
import TextInput from "common/input/Text";
import { Texts } from "styles/common";

type CashReceiptsProps = {
  cashReceipts: CashReceiptsType;
  setCashReceipts: Dispatch<SetStateAction<CashReceiptsType>>;
};

const receiptLabel = css`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  ${Texts.B3_15_M1}
`;

const radioWrapper = css`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
  ${Texts.B2_14_R1}
`;

const radioInnerWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const radio = css`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
  background: url("/icons/check/UnCheckedRadio.svg") center center no-repeat;
  :checked {
    background: url("/icons/check/CheckedRadio.svg") center center no-repeat;
  }
  :focus {
    outline: none;
  }
`;

const phoneLabel = css`
  ${Texts.B2_14_R1}
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
`;

const CashReceipts = (props: CashReceiptsProps) => {
  const checkboxId = useId();

  const eraseData = () => {
    if (!props.cashReceipts.isUse)
      return props.setCashReceipts((prev) => {
        return { ...prev, data: "" };
      });
  };

  return (
    <>
      <div css={receiptLabel}>
        <Checkbox
          forId={checkboxId}
          setIsChecked={props.setCashReceipts}
          objectKey="isUse"
          extraFnc={eraseData}
        />
        <label htmlFor={checkboxId}>현금 영수증 발행</label>
      </div>
      {props.cashReceipts?.isUse && (
        <>
          <div css={radioWrapper}>
            <div css={radioInnerWrapper}>
              <input
                css={radio}
                type="radio"
                id="personal"
                name="method"
                defaultChecked={true}
                onClick={() =>
                  props.setCashReceipts((prev: any) => {
                    return { ...prev, isPersonal: true };
                  })
                }
              />
              <label htmlFor="personal">개인소득공제용</label>
            </div>
            <div css={radioInnerWrapper}>
              <input
                css={radio}
                type="radio"
                id="business"
                name="method"
                onClick={() =>
                  props.setCashReceipts((prev: any) => {
                    return { ...prev, isPersonal: false };
                  })
                }
              />
              <label htmlFor="business">사업자증빙용, 세금계산서</label>
            </div>
          </div>
          <div css={inputWrapper}>
            <label css={phoneLabel}>
              {props.cashReceipts.isPersonal ? "휴대폰 번호" : "사업자 번호"}
            </label>
            {/* TODO: input입력 시 cashReceipts.data에 값 입력 */}
            <TextInput
              setState={props.setCashReceipts}
              objectKey="data"
              state={props.cashReceipts.data}
              type="number"
            />
          </div>
        </>
      )}
    </>
  );
};

export default CashReceipts;
