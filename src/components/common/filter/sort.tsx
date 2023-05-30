import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { css } from "@emotion/react";

import Down from "public/icons/direction/down.svg";
import BottomSheet from "common/bottomSheet";
import Radio from "customer/main/radio";
import { Texts } from "styles/common";
import { GetStoreListType } from "pages/api/store";

type SortProps = {
  isSearchPage?: boolean;
  setStoreListParams: Dispatch<SetStateAction<GetStoreListType>>;
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
  color: #191919;
`;

const Sort = ({ isSearchPage, setStoreListParams }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedSort, setCheckedSort] = useState({ id: 1, content: "인기순" });

  useEffect(() => {
    const sortBy = checkedSort.content === "인기순" ? "likeNumber" : "id";
    setStoreListParams((prev) => ({ ...prev, sortBy: sortBy }));
  }, [checkedSort]);

  return (
    <>
      <div css={wrapper} onClick={() => setIsOpen(true)}>
        <span css={sortText(isSearchPage as boolean)}>{checkedSort.content}</span>
        <Down width="14" height="14" stroke="#14181F" />
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
