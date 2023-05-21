import React, { CSSProperties, Dispatch, MutableRefObject, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

export type statusType = "edit" | "delete" | "default";

type PopoverProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  popoverRef: MutableRefObject<null>;
  style: CSSProperties;
  attributes: any;
  label: string;
  setStatus?: Dispatch<SetStateAction<statusType>>;
  btnAction?: () => void;
};

const wrapper = (isOpen: boolean) => css`
  visibility: ${isOpen ? "visible" : "hidden"};
  display: flex;
  flex-direction: column;
  width: 10rem;
  box-shadow: 1px 2px 10px rgba(205, 186, 160, 0.6);
  border-radius: 0.25rem;
  background-color: white;
  z-index: 1;

  button {
    text-align: left;
    padding: 0.5rem 1rem;
    ${Texts.B3_15_M1}

    :hover {
      background-color: ${Colors.neutral10};
    }
  }
`;

const colored = css`
  color: ${Colors.amber50};
`;

const Popover = (props: PopoverProps) => {
  return (
    <div
      css={wrapper(props.isOpen)}
      ref={props.popoverRef}
      style={props.style}
      {...props.attributes}
    >
      {props.label === "메뉴" && (
        <button
          onClick={() => {
            props.setStatus && props.setStatus("edit");
            props.setIsOpen(false);
          }}
        >
          수정
        </button>
      )}
      <button
        onClick={() => {
          props.setStatus && props.setStatus("delete");
          props.setIsOpen(false);
        }}
      >
        삭제
      </button>
      <button onClick={props.btnAction} css={colored}>
        {props.label} 등록
      </button>
    </div>
  );
};

export default Popover;
