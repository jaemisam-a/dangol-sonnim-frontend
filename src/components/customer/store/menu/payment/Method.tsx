import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { CashReceiptsType, SelectedType, TransferType } from "pages/store/[id]/payment";
import StoreSection from "customer/store/Section";
import MethodButtonList from "customer/store/menu/payment/MethodButtonList";
import PaymentSelect from "customer/store/menu/payment/Select";
import CashReceipts from "customer/store/menu/payment/CashReceipts";
import TextInput from "common/input/Text";
import { Texts } from "styles/common";

const PAYMENT_METHODS = [
  { id: 1, name: "카드" },
  { id: 2, name: "자동이체" },
  { id: 3, name: "카카오페이" },
  { id: 4, name: "토스페이" },
  { id: 5, name: "네이버페이" },
];

type PaymentMethodProps = {
  selectMethod: number;
  setSelectMethod: Dispatch<SetStateAction<number>>;
  cashReceipts: CashReceiptsType;
  setCashReceipts: Dispatch<SetStateAction<CashReceiptsType>>;
  selectedCard: SelectedType;
  setSelectedCard: Dispatch<SetStateAction<SelectedType>>;
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
      {props.selectMethod === 1 && (
        <div css={paymentSelect}>
          <PaymentSelect
            placeholder="카드를 선택해주세요"
            list={[
              { id: "1", name: "우리카드" },
              { id: "2", name: "신한카드" },
              { id: "3", name: "현대카드" },
              { id: "4", name: "KB국민카드" },
              { id: "5", name: "롯데카드" },
              { id: "6", name: "NH농협카드" },
              { id: "7", name: "비씨카드" },
              { id: "8", name: "하나카드" },
              { id: "9", name: "씨티카드" },
              { id: "10", name: "카카오뱅크카드" },
            ]}
            selected={props.selectedCard}
            setSelected={props.setSelectedCard}
          />
        </div>
      )}
      {props.selectMethod === 2 && (
        <>
          <div css={paymentSelect}>
            <PaymentSelect
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
