import React from "react";
import { css } from "@emotion/react";

import Menu from "common/menuCard";

type MenusBottomProps = {
  menus: { id: number; name: string; price: number; img: string }[];
};

const wrapper = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem 1.25rem;
  gap: 1rem;
  overflow: scroll;
  height: 36.875rem;
`;

const MenusBottom = (props: MenusBottomProps) => {
  return (
    <>
      <div css={wrapper}>
        {props.menus.map((menu) => (
          <Menu
            key={menu.id}
            imgSrc={menu.img}
            name={menu.name}
            price={menu.price}
            isBottom={true}
          />
        ))}
      </div>
    </>
  );
};

export default MenusBottom;
