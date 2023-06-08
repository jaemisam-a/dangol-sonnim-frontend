import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { CashReceiptsType, TransferType } from "pages/store/[id]/payment";
import StoreSection from "customer/store/section";
import MethodButtonList from "customer/store/menu/payment/methodButtonList";
import Select from "common/select";
import CashReceipts from "customer/store/menu/payment/cashReceipts";
import TextInput from "common/input/text";
import { Texts } from "styles/common";

const PAYMENT_METHODS = [
  { id: 1, name: "카드" },
  // { id: 2, name: "자동이체" },
  { id: 3, name: "카카오페이" },
  { id: 4, name: "토스페이" },
  // { id: 5, name: "네이버페이" },
];

type PaymentMethodProps = {
  selectMethod: number;
  setSelectMethod: Dispatch<SetStateAction<number>>;
  cashReceipts: CashReceiptsType;
  setCashReceipts: Dispatch<SetStateAction<CashReceiptsType>>;
  selectedBank: TransferType;
  setSelectedBank: Dispatch<SetStateAction<TransferType>>;
};

const methodButtonList = css`
  margin-bottom: 1.25rem;
`;

const paymentSelect = css`
  margin-bottom: 1.25rem;
`;

const label = css`
  ${Texts.B2_14_R1}
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
`;

const PaymentMethod = (props: PaymentMethodProps) => {
  return (
    <StoreSection fold={false} sectionTitle="결제수단">
      <div css={methodButtonList}>
        <MethodButtonList
          methods={PAYMENT_METHODS}
          selectMethod={props.selectMethod}
          setSelectMethod={props.setSelectMethod}
        />
      </div>
      {props.selectMethod === 2 && (
        <>
          <div css={paymentSelect}>
            <Select
              placeholder="은행을 선택해주세요"
              list={[
                { id: "1", name: "국민은행" },
                { id: "2", name: "농협" },
                { id: "3", name: "우리은행" },
                { id: "4", name: "SC제일은행" },
                { id: "5", name: "기업은행" },
                { id: "6", name: "외환은행" },
                { id: "7", name: "하나은행" },
                { id: "8", name: "카카오뱅크" },
                { id: "9", name: "신한은행" },
                { id: "10", name: "한국씨티은행" },
              ]}
              selected={props.selectedBank}
              setSelected={props.setSelectedBank}
            />
          </div>
          <div css={inputWrapper}>
            <label css={label}>예금주명</label>
            <TextInput
              setState={props.setSelectedBank}
              objectKey="accountHolder"
              state={props.selectedBank.accountHolder}
              type="text"
            />
          </div>
          <div css={inputWrapper}>
            <label css={label}>계좌번호</label>
            <TextInput
              setState={props.setSelectedBank}
              objectKey="accountNumber"
              state={props.selectedBank.accountNumber}
              type="number"
              minValue={11}
              maxValue={14}
            />
          </div>
        </>
      )}
      {props.selectMethod === 2 && (
        <CashReceipts cashReceipts={props.cashReceipts} setCashReceipts={props.setCashReceipts} />
      )}
    </StoreSection>
  );
};

export default PaymentMethod;
