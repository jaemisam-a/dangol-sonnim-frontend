import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import TextInput, { InputStatus, TextInputType } from "common/input/Text";

export type InputWithButtonType = {
  label?: string;
  btnName?: string;
  // 라벨 옆 * 유무
  isRequired?: boolean;
  btnAction?: () => void;
  setState?: Dispatch<SetStateAction<any>> | Dispatch<SetStateAction<string>>;
  isHidden?: boolean;
} & TextInputType;

type InputWithButtonProps = {
  // 바텀시트 내부에 있는지
  isInBottomSheet: boolean;
  inputStatus?: InputStatus;
  state: string;
} & InputWithButtonType;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const inputBtnWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const inputBtn = (state?: InputStatus) => css`
  width: 6.75rem;
  height: fit-content;
  padding: 0.5rem 0.75rem;
  background-color: ${Colors.amber50};
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: ${state && "1.125rem"};
  color: ${Colors.white};
  ${Texts.B3_15_M2}
`;

const inputLabel = (isInBottomSheet: boolean) => css`
  ${isInBottomSheet ? Texts.S1_16_B : Texts.B3_15_M2}
  color: ${isInBottomSheet ? Colors.black : Colors.neutral80};

  span {
    color: ${Colors.amber50};
  }
`;

const InputWithButton = (props: InputWithButtonProps) => {
  const BUTTON_WIDTH = "6.75rem";

  if (props.isHidden) return null;

  return (
    <>
      <div css={inputWrapper}>
        {props.label && (
          <div css={inputLabel(props.isInBottomSheet)}>
            {props.label}
            <span>{props.isRequired && "*"}</span>
          </div>
        )}
        <div css={inputBtnWrapper}>
          <TextInput
            wrapperWidth={props.btnName ? `calc(100% - ${BUTTON_WIDTH})` : "100%"}
            placeholder={props.placeholder}
            inputStatus={props.inputStatus}
            inputStatusMessage={props.inputStatusMessage}
            setState={props.setState}
            objectKey={props.objectKey}
            state={props.state}
            type={props.type}
            minValue={props.minValue}
            maxValue={props.maxValue}
          />
          {props.btnName && (
            <button type="button" css={inputBtn(props.inputStatus)} onClick={props.btnAction}>
              {props.btnName}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputWithButton;
