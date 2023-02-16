import React, { ChangeEvent, Dispatch, SetStateAction, useId } from "react";
import { css } from "@emotion/react";

import { Colors } from "styles/common";

type CheckboxProps = {
  setIsChecked: Dispatch<SetStateAction<boolean>>;
};

const inputWrapper = css`
  & input {
    display: none;
  }

  & label {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    display: inline-block;
    border-radius: 2px;
    border: 1px solid ${Colors.neutral60};
    background: url("/icons/CheckGrey.svg") center center no-repeat;
  }

  & input:checked + label {
    border: none;
    background: url("/icons/Check.svg") center center no-repeat ${Colors.amber50};
  }
`;

const Checkbox = (props: CheckboxProps) => {
  const id = useId();

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    props.setIsChecked(e.target.checked);
  };

  return (
    <>
      <div css={inputWrapper}>
        <input type="checkbox" id={id} onChange={handleCheck} />
        <label htmlFor={id} />
      </div>
    </>
  );
};

export default Checkbox;
