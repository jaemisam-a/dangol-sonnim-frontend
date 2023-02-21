import React, { useState } from "react";
import { css } from "@emotion/react";

import ArrowDown from "public/icons/ArrowDown.svg";
import BottomSheet from "common/BottomSheet";
import Radio from "customer/main/Radio";
import { Texts } from "styles/common";

const subText = css`
  ${Texts.C1_11_R}
  width: fit-content;
`;

const locationWrapper = css`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: fit-content;
`;

const locationName = css`
  ${Texts.S3_18_M}
`;

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedLocation, setCheckedLocation] = useState({ id: 1, content: "강남역" });

  return (
    <>
      <div css={subText}>지금 보고있는 지역은</div>
      <div css={locationWrapper} onClick={() => setIsOpen(true)}>
        <span css={locationName}>{checkedLocation.content}</span>
        <ArrowDown width="24" height="24" stroke="black" />
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
