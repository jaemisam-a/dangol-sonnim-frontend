import React, { MouseEvent } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Close from "public/icons/close/close.svg";

type TagProps = {
  text: string;
  bgColor?: string;
  enableDelete?: boolean;
  onDeleteBtnClick?: (text: string) => void;
};

const tagStyle = (bgColor: string) => css`
  background-color: ${bgColor ?? Colors.amber50};
  color: ${Colors.black};
  ${Texts.C2_12_M}
  padding: 0.313rem 0.75rem;
  width: fit-content;
  text-align: center;
  align-items: center;
  border-radius: 56.25rem;
  white-space: nowrap;

  button {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Tag = ({ text, bgColor, enableDelete, onDeleteBtnClick }: TagProps) => {
  const onDelete = (e: MouseEvent) => {
    e.preventDefault();
    onDeleteBtnClick && onDeleteBtnClick(text);
  };

  return (
    <div css={tagStyle(bgColor as string)}>
      {text}
      {enableDelete && (
        <button type="button" onClick={onDelete}>
          <Close width={20} height={20} stroke="#14181F" />
        </button>
      )}
    </div>
  );
};

export default Tag;
