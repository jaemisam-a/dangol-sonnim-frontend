import React, { Dispatch, SetStateAction, useEffect } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type CategoryPropsType = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const wrapper = css`
  margin: 1rem 0 0.75rem;
  display: flex;
  gap: 0.75rem;
`;

const categoryBtn = (value: string, selected: string) => css`
  ${Texts.B3_15_R1}
  padding: 0;
  color: ${value === selected ? Colors.black : Colors.neutral60};
  font-weight: ${value === selected ? 500 : 400};
`;

const Category = (props: CategoryPropsType) => {
  useEffect(() => {
    // TODO: 선택한 카테고리로 쿼리 요청
  }, [props.selected]);

  const categories = [
    { value: "ALL", category: "전체" },
    { value: "KOREAN", category: "한식" },
    { value: "BUNSIK", category: "분식" },
    { value: "CHINESE", category: "중식" },
    { value: "JAPANESE", category: "일식" },
    { value: "WESTERN", category: "양식" },
    { value: "CAFE", category: "카페" },
  ];

  return (
    <div css={wrapper}>
      {categories.map(({ value, category }) => (
        <button
          key={value}
          css={categoryBtn(value, props.selected)}
          onClick={() => props.setSelected(value)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
