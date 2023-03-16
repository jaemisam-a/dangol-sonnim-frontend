import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import CheckedRadio from "public/icons/check/CheckedRadio.svg";
import UnCheckedRadio from "public/icons/check/UnCheckedRadio.svg";

export type checkedAddrType = { roadAddr: string };

type LocationListProps = {
  idx: number;
  roadAddr: string;
  jibunAddr: string;
  checkedAddr: checkedAddrType;
  setCheckedAddr: Dispatch<SetStateAction<checkedAddrType>>;
  lastRef: (node?: Element | null | undefined) => void;
  dataLength: number;
};

const wrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #d9d9d9;
`;

const addrWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  ${Texts.B2_14_R2}
`;

const roadArr = css`
  color: #1a1a1a;
`;

const jibunWrapper = css`
  display: flex;
  gap: 0.438rem;
  align-items: center;
`;

const jibunTag = css`
  display: flex;
  align-items: center;
  padding: 0px 0.375rem;
  border-radius: 7.5rem;
  background-color: ${Colors.amber50};
  color: white;
  white-space: nowrap;
  height: fit-content;
  ${Texts.C1_11_B}
`;

const jibunAddr = css`
  color: #464646;
`;

const radioButton = css`
  height: fit-content;
`;

const LocationList = (props: LocationListProps) => {
  const handleRadio = () => {
    props.setCheckedAddr({ roadAddr: props.roadAddr });
  };

  return (
    <div css={wrapper} ref={props.idx === props.dataLength - 1 ? props.lastRef : null}>
      <div css={addrWrapper}>
        <div css={roadArr}>{props.roadAddr}</div>
        <div css={jibunWrapper}>
          <span css={jibunTag}>지번</span>
          <span css={jibunAddr}>{props.jibunAddr}</span>
        </div>
      </div>
      <button css={radioButton} onClick={handleRadio}>
        {props.roadAddr === props.checkedAddr.roadAddr ? <CheckedRadio /> : <UnCheckedRadio />}
      </button>
    </div>
  );
};

export default LocationList;
