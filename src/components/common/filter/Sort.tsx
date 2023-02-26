import React, { useState } from "react";
import { css } from "@emotion/react";

import ArrowDown from "public/icons/ArrowDown.svg";
import BottomSheet from "common/BottomSheet";
import Radio from "customer/main/Radio";
import { Texts } from "styles/common";

type SortProps = {
  isSearchPage?: boolean;
};

const wrapper = css`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  cursor: pointer;
  width: fit-content;
`;

const sortText = (isSearchPage: boolean) => css`
  ${isSearchPage ? Texts.B1_13_R2 : Texts.C2_12_R}
  color: "#191919";
`;

const Sort = ({ isSearchPage }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedSort, setCheckedSort] = useState({ id: 1, content: "인기순" });

  return (
    <>
      <div css={wrapper} onClick={() => setIsOpen(true)}>
        <span css={sortText(isSearchPage as boolean)}>{checkedSort.content}</span>
        <ArrowDown width="14" height="14" stroke="#14181F" />
      </div>
      <BottomSheet
        height="10.625rem"
        isBackButton={false}
        isXButton={true}
        open={isOpen}
        setOpen={setIsOpen}
        title="정렬"
        component={
          <Radio
            checked={checkedSort}
            setChecked={setCheckedSort}
            setOpenBottomSheet={setIsOpen}
            list={[
              { id: 1, content: "인기순" },
              { id: 2, content: "최신순" },
            ]}
          />
        }
      />
    </>
  );
};

export default Sort;
