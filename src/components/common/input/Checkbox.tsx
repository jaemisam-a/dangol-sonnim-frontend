import React, { ChangeEvent, Dispatch, SetStateAction, useId } from "react";
import { css } from "@emotion/react";

import { Colors } from "styles/common";

type CheckboxProps = {
  setIsChecked: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<boolean>>;
  isChecked?: any | boolean;
  objectKey?: string;
  extraFnc?: (isChecked: boolean) => void;
  disable?: boolean;
};

const inputWrapper = (disable: boolean) => css`
  height: 1.25rem;

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
    background: url(${disable ? "/icons/CheckedGrey.svg" : "/icons/CheckWhite.svg"}) center center
      no-repeat ${disable ? "transparent" : Colors.amber50};
  }
`;

const Checkbox = (props: CheckboxProps) => {
  const id = useId();

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.objectKey) {
      props.setIsChecked((prev: any) => {
        return { ...prev, [props.objectKey as string]: e.target.checked };
      });
    } else {
      props.setIsChecked(e.target.checked);
    }
    props.extraFnc && props.extraFnc(e.target.checked);
  };

  return (
    <>
      <div css={inputWrapper(props.disable || false)}>
        <input
          type="checkbox"
          id={id}
          onChange={handleCheck}
          disabled={props.disable}
          checked={props.objectKey ? props.isChecked?.[props.objectKey] : props.isChecked}
        />
        <label htmlFor={id} />
      </div>
    </>
  );
};

export default Checkbox;
