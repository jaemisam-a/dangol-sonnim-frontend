import React, { ReactElement } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type SettingButtonProps = {
  icon: ReactElement;
  heading: string;
  action: () => void;
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

const SettingButton = (props: SettingButtonProps) => {
  return (
    <button css={wrapper} onClick={props.action}>
      <div css={icon}>{props.icon}</div>
      <div>{props.heading}</div>
    </button>
  );
};

export default SettingButton;
