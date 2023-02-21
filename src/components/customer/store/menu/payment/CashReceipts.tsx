import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { cashReceiptsType } from "pages/customer/store/[id]/payment";
import Checkbox from "common/input/Checkbox";
import TextInput from "common/input/Text";
import { Texts } from "styles/common";

type CashReceiptsType = {
  cashReceipts: cashReceiptsType;
  setCashReceipts: Dispatch<SetStateAction<cashReceiptsType>>;
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
  background: url("/icons/UnCheckedRadio.svg") center center no-repeat;
  :checked {
    background: url("/icons/CheckedRadio.svg") center center no-repeat;
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

const CashReceipts = (props: CashReceiptsType) => {
  return (
    <>
      <div css={receiptLabel}>
        <Checkbox setIsChecked={props.setCashReceipts} objectKey="isUse" />
        <label>현금 영수증 발행</label>
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
            <TextInput width="100%" />
          </div>
        </>
      )}
    </>
  );
};

export default CashReceipts;
