import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { cashReceiptsType, selectedType } from "pages/customer/store/[id]/payment";
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
  cashReceipts: cashReceiptsType;
  setCashReceipts: Dispatch<SetStateAction<cashReceiptsType>>;
  selectedCard: selectedType;
  setSelectedCard: Dispatch<SetStateAction<selectedType>>;
  selectedBank: selectedType;
  setSelectedBank: Dispatch<SetStateAction<selectedType>>;
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
              ]}
              selected={props.selectedBank}
              setSelected={props.setSelectedBank}
            />
          </div>
          <div css={inputWrapper}>
            <label css={label}>예금주명</label>
            <TextInput width="100%" />
          </div>
          <div css={inputWrapper}>
            <label css={label}>계좌번호</label>
            <TextInput width="100%" />
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
