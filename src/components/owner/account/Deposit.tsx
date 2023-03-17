import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { css } from "@emotion/react";

import { TransferType } from "pages/store/[id]/payment";
import InputWithButton, { InputWithButtonType } from "common/input/WithButton";
import PaymentSelect from "customer/store/menu/payment/Select";
import { Colors, Texts } from "styles/common";

type DepositAccount = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 1.25rem 3.25rem 1.25rem;
`;

const bankLabel = css`
  margin-bottom: 0.25rem;
  ${Texts.S1_16_B}
`;

const submitButton = (isEmpty: boolean) => css`
  color: ${isEmpty ? Colors.neutral50 : Colors.white};
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: ${isEmpty ? Colors.neutral20 : Colors.amber50};
  border-radius: 0.25rem;
  cursor: ${isEmpty ? "not-allowed" : "pointer"};
  ${Texts.S1_16_M};
`;

const DepositAccount = (props: DepositAccount) => {
  const [selectedBank, setSelectedBank] = useState<TransferType>({
    id: "",
    name: "",
    accountHolder: "",
    accountNumber: "",
  });

  const inputArr: InputWithButtonType[] = [
    { type: "text", label: "예금주", objectKey: "accountHolder" },
    {
      type: "number",
      label: "계좌번호",
      objectKey: "accountNumber",
      placeholder: "‘-’없이 입력해주세요",
    },
  ];

  const isEmpty = Object.values(selectedBank).some((el) => !el);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 계좌번호 수정 api 요청
    props.setOpen(false);
  };

  return (
    <>
      <form onSubmit={submit} css={wrapper}>
        <InputWithButton
          isInBottomSheet={false}
          type={inputArr[0].type}
          state={selectedBank[inputArr[0].objectKey as "accountHolder" | "accountNumber"]}
          label={inputArr[0].label}
          objectKey={inputArr[0].objectKey}
          placeholder={inputArr[0].placeholder}
          setState={setSelectedBank}
          isBold={true}
        />
        <div>
          <label css={bankLabel}>은행선택</label>
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
            selected={selectedBank}
            setSelected={setSelectedBank}
          />
        </div>
        <InputWithButton
          isInBottomSheet={false}
          type={inputArr[1].type}
          state={selectedBank[inputArr[1].objectKey as "accountHolder" | "accountNumber"]}
          label={inputArr[1].label}
          objectKey={inputArr[1].objectKey}
          placeholder={inputArr[1].placeholder}
          setState={setSelectedBank}
          isBold={true}
        />
        <button disabled={isEmpty} css={submitButton(isEmpty)}>
          확인
        </button>
      </form>
    </>
  );
};

export default DepositAccount;
