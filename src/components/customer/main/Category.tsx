import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

const wrapper = css`
  margin: 1rem 0 0.75rem;
  display: flex;
  gap: 0.75rem;
`;

const categoryBtn = (id: number, selected: number) => css`
  ${Texts.B3_15_R1}
  padding: 0;
  color: ${id === selected ? Colors.black : Colors.neutral60};
  font-weight: ${id === selected ? 500 : 400};
`;

const Category = () => {
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    // TODO: 선택한 카테고리로 쿼리 요청
  }, [selected]);

  const categories = [
    { id: 1, category: "전체" },
    { id: 2, category: "한식" },
    { id: 3, category: "분식" },
    { id: 4, category: "중식" },
    { id: 5, category: "일식" },
    { id: 6, category: "양식" },
  ];

  return (
    <div css={wrapper}>
      {categories.map(({ id, category }) => (
        <button key={id} css={categoryBtn(id, selected)} onClick={() => setSelected(id)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
