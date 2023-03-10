import React, { useState } from "react";
import { css } from "@emotion/react";

import Down from "public/icons/direction/Down.svg";
import BottomSheet from "common/BottomSheet";
import Radio from "customer/main/Radio";
import { Texts } from "styles/common";

type LocationProps = {
  isSearchPage?: boolean;
};

const subText = (isSearchPage: boolean) => css`
  display: ${isSearchPage ? "none" : "block"};
  ${Texts.C1_11_R}
  width: fit-content;
`;

const locationWrapper = css`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: fit-content;
  gap: 0.125rem;
`;

const locationName = (isSearchPage: boolean) => css`
  ${isSearchPage ? Texts.B1_13_R2 : Texts.S3_18_M}
`;

const Location = ({ isSearchPage }: LocationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedLocation, setCheckedLocation] = useState({ id: 1, content: "강남역" });

  return (
    <>
      <div css={subText(isSearchPage as boolean)}>지금 보고있는 지역은</div>
      <div css={locationWrapper} onClick={() => setIsOpen(true)}>
        <span css={locationName(isSearchPage as boolean)}>{checkedLocation.content}</span>
        <Down width="14" height="14" stroke="black" />
      </div>
      <BottomSheet
        height="18.125rem"
        isBackButton={false}
        isXButton={true}
        open={isOpen}
        setOpen={setIsOpen}
        title="지역선택"
        component={
          <Radio
            checked={checkedLocation}
            setChecked={setCheckedLocation}
            setOpenBottomSheet={setIsOpen}
            list={[
              { id: 1, content: "강남역" },
              { id: 2, content: "구로구" },
              { id: 3, content: "금천구" },
              { id: 4, content: "관악구" },
              { id: 5, content: "판교" },
            ]}
          />
        }
      />
    </>
  );
};

export default Location;
