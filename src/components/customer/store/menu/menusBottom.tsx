import React from "react";
import { css } from "@emotion/react";

import Menu from "common/menuCard";

type MenusBottomProps = {
  menuList: { imageUrl: string; menuId: number; name: string; price: number; storeId: number }[];
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
        {props.menuList?.map((menu) => (
          <Menu
            key={menu.menuId}
            imgSrc={menu.imageUrl}
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
