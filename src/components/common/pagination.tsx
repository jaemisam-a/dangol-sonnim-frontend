import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Right from "public/icons/direction/paginationRight.svg";
import Left from "public/icons/direction/paginationLeft.svg";

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  // 한 번에 보이는 페이지의 개수
  countPerOne: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
};

const wrapper = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const directionButton = css`
  width: 1.5rem;
  height: 1.5rem;
`;

const page = (isCurrentPage: boolean) => css`
  padding: 0.5rem;
  color: ${isCurrentPage ? Colors.neutral90 : Colors.neutral40};
  ${Texts.S1_16_M}
`;

const Pagination = (props: PaginationProps) => {
  const [pageList, setPageList] = useState<number[]>([]);

  // 페이지 목록 구하는 함수
  useEffect(() => {
    const pageNumber: number[] = [];
    // 현재페이지가 주어졌을 때 보여지는 페이지 목록의 첫번째 페이지
    const firstPageNumber =
      Math.floor((props.currentPage - 1) / props.countPerOne) * props.countPerOne + 1;

    for (let i = 0; i < props.countPerOne; i++) {
      pageNumber.push(i + firstPageNumber);
      if (i + firstPageNumber >= props.totalPage) break;
    }

    setPageList(pageNumber);
  }, [props.currentPage]);

  const handleLeft = () => {
    if (props.currentPage === 1) return;
    props.setPageNumber((prev) => prev - 1);
  };

  const handleRight = () => {
    if (props.currentPage === props.totalPage) return;
    props.setPageNumber((prev) => prev + 1);
  };

  return (
    <div css={wrapper}>
      <button css={directionButton} onClick={handleLeft}>
        <Left />
      </button>
      <span>
        {pageList.map((el) => (
          <button
            css={page(props.currentPage === el)}
            key={el}
            onClick={() => props.setPageNumber(el)}
          >
            {el}
          </button>
        ))}
      </span>
      <button css={directionButton} onClick={handleRight}>
        <Right />
      </button>
    </div>
  );
};

export default Pagination;
