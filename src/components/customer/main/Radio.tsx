import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import CheckedRadio from "public/icons/CheckedRadio.svg";
import UnCheckedRadio from "public/icons/UnCheckedRadio.svg";

type RadioData = {
  id: number;
  content: string;
};

type RadioProps = {
  list: RadioData[];
  checked: RadioData;
  setChecked: Dispatch<SetStateAction<RadioData>>;
  setOpenBottomSheet: Dispatch<SetStateAction<boolean>>;
};

const wrapper = css`
  padding-top: 1.25rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const contentWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    cursor: pointer;
  }
`;

const contentText = css`
  ${Texts.B3_15_M2}
  cursor: pointer;
`;

const Radio = (props: RadioProps) => {
  const handleRadio = (item: RadioData) => () => {
    props.setChecked(item);
    props.setOpenBottomSheet(false);
  };

  return (
    <>
      <div css={wrapper}>
        {props.list.map((item) => (
          <div css={contentWrapper} key={item.id} onClick={handleRadio(item)}>
            {item.id === props.checked.id ? (
              <CheckedRadio width="20" height="20" fill={Colors.amber50} stroke={Colors.amber50} />
            ) : (
              <UnCheckedRadio width="20" height="20" stroke={Colors.neutral60} />
            )}
            <span css={contentText}>{item.content}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Radio;
