import React, { Dispatch, SetStateAction, useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import ArrowDown from "public/icons/ArrowDown.svg";
import ArrowUp from "public/icons/ArrowUp.svg";
import { selectedType, transferType } from "pages/customer/store/[id]/payment";

type PaymentSelectProps = {
  placeholder: string;
  list: selectedType[] | transferType[];
  selected: selectedType | transferType;
  setSelected: Dispatch<SetStateAction<selectedType>> | Dispatch<SetStateAction<transferType>>;
};

const wrapper = css`
  position: relative;
`;

const select = (isOpen: boolean) => css`
  width: 100%;
  height: 3rem;
  border: 1px solid ${Colors.neutral30};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.813rem 0.75rem;
  color: rgba(0, 0, 0, 0.9);
  ${Texts.B3_15_M2};
  cursor: pointer;
  background-color: ${isOpen && "#FFFCE7"};
`;

const options = css`
  position: absolute;
  background-color: white;
  border: 1px solid ${Colors.amber50};
  border-radius: 0.25rem;
  width: 100%;
  margin-top: 2px;
`;

const option = css`
  background-color: #f8f8f8;
  padding: 0.563rem 0 0.563rem 0.75rem;
  border-bottom: 1px solid #f1f1f1;
  border-radius: 0.25rem;
  cursor: pointer;
  ${Texts.B3_15_R2}
`;

const PaymentSelect = (props: PaymentSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div css={wrapper}>
        <div css={select(isOpen)} onClick={() => setIsOpen((prev) => !prev)}>
          <span>{props.selected.id ? props.selected.name : props.placeholder}</span>
          {isOpen ? (
            <ArrowUp width={20} height={20} stroke={Colors.neutral80} />
          ) : (
            <ArrowDown width={20} height={20} stroke={Colors.neutral80} />
          )}
        </div>
        {isOpen && (
          <div css={options}>
            {props.list.map((item) => (
              <div
                css={option}
                key={item.id}
                onClick={() => {
                  props.setSelected((prev: any) => {
                    return { ...prev, ...item };
                  });
                  setIsOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentSelect;
