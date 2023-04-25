import React, { ChangeEvent, ReactElement, RefObject, useRef } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type SettingButtonProps = {
  inputType?: "file";
  onChange?: (e: ChangeEvent) => void;
  icon: ReactElement;
  heading: string;
  action: (inputRef?: RefObject<HTMLInputElement>) => void;
};

const wrapper = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;
  background-color: #f8f8f8;
  justify-content: center;
  width: 100%;
  color: ${Colors.amber50};
  ${Texts.B3_15_M2}
`;

const icon = css`
  height: 1.5rem;
`;

const inputStyle = css`
  display: none;
`;

const SettingButton = (props: SettingButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        css={wrapper}
        onClick={() => props.action(props.inputType === "file" ? inputRef : undefined)}
      >
        <div css={icon}>{props.icon}</div>
        <div>{props.heading}</div>
      </button>
      {props.inputType === "file" && (
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png"
          multiple={true}
          css={inputStyle}
          ref={inputRef}
          onChange={props.onChange}
        />
      )}
    </>
  );
};

export default SettingButton;
