import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type MethodButtonProps = {
  id: number;
  name: string;
  selectMethod: number;
  setSelectMethod: Dispatch<SetStateAction<number>>;
};

const methodBtn = (isSelected: boolean) => css`
  width: 6.25rem;
  height: 2rem;
  border: ${isSelected ? "none" : `1px solid ${Colors.neutral30}`};
  border-radius: 0.25rem;
  background-color: ${isSelected ? Colors.amber50 : Colors.white};
  color: ${isSelected ? Colors.white : Colors.neutral80};
  ${Texts.B2_14_M}
`;

const MethodButton = (props: MethodButtonProps) => {
  return (
    <>
      <button
        onClick={() => props.setSelectMethod(props.id)}
        css={methodBtn(props.selectMethod === props.id)}
      >
        {props.name}
      </button>
    </>
  );
};

export default MethodButton;
