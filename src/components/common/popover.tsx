import React, { CSSProperties, Dispatch, MutableRefObject, SetStateAction } from "react";
import { useRouter } from "next/router";
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
};

const wrapper = (isOpen: boolean) => css`
  visibility: ${isOpen ? "visible" : "hidden"};
  display: flex;
  flex-direction: column;
  width: 10rem;
  box-shadow: 1px 2px 10px rgba(205, 186, 160, 0.6);
  border-radius: 0.25rem;
  background-color: white;

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
  const { push } = useRouter();

  return (
    <div
      css={wrapper(props.isOpen)}
      ref={props.popoverRef}
      style={props.style}
      {...props.attributes}
    >
      <button
        onClick={() => {
          props.setStatus && props.setStatus("edit");
          props.setIsOpen(false);
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          props.setStatus && props.setStatus("delete");
          props.setIsOpen(false);
        }}
      >
        삭제
      </button>
      <button onClick={() => push("/owner/settings/menu")} css={colored}>
        {props.label} 등록
      </button>
    </div>
  );
};

export default Popover;
