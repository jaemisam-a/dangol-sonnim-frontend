import React, { Dispatch, SetStateAction, useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Down from "public/icons/direction/down.svg";
import Up from "public/icons/direction/up.svg";
import { SelectedType, TransferType } from "pages/store/[id]/payment";

type SelectProps = {
  placeholder?: string;
  list: SelectedType[] | TransferType[];
  selected: SelectedType | TransferType;
  setSelected:
    | Dispatch<SetStateAction<SelectedType>>
    | Dispatch<SetStateAction<TransferType>>
    | Dispatch<SetStateAction<string>>;
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
  max-height: 12.5rem;
  overflow: scroll;
  z-index: 1;
`;

const option = css`
  background-color: #f8f8f8;
  padding: 0.563rem 0 0.563rem 0.75rem;
  border-bottom: 1px solid #f1f1f1;
  border-radius: 0.25rem;
  cursor: pointer;
  ${Texts.B3_15_R2}
`;

const Select = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div css={wrapper}>
        <div css={select(isOpen)} onClick={() => setIsOpen((prev) => !prev)}>
          <span>{props.selected.id ? props.selected.name : props.placeholder}</span>
          {isOpen ? (
            <Up width={20} height={20} stroke={Colors.neutral80} />
          ) : (
            <Down width={20} height={20} stroke={Colors.neutral80} />
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

export default Select;
