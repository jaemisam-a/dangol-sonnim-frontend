import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import { categories } from "src/utils/category";

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
  const allCategories = [{ id: "ALL", name: "전체" }, ...categories];

  return (
    <div css={wrapper}>
      {allCategories.map(({ id, name }) => (
        <button
          key={id}
          css={categoryBtn(id, props.selected)}
          onClick={() => props.setSelected(id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default Category;
