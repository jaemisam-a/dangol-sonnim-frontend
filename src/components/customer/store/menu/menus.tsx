import React, { useState } from "react";
import { css } from "@emotion/react";

import RightIcon from "public/icons/direction/right.svg";
import { Colors, Texts } from "styles/common";
import StoreSection from "customer/store/section";
import Menu from "common/menuCard";
import MenusBottom from "customer/store/menu/menusBottom";
import BottomSheet from "common/bottomSheet";

type MenusPropsType = {
  menuList: { imageUrl: string; menuId: number; name: string; price: number; storeId: number }[];
};

const menuWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const moreBtnWrapper = css`
  display: flex;
  justify-content: end;
  margin-bottom: 1.5rem;
`;

const moreBtn = css`
  display: flex;
  align-items: center;
  ${Texts.B1_13_M1}
  color: ${Colors.neutral90};
`;

const Menus = (props: MenusPropsType) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StoreSection sectionTitle="메뉴" menuCount={props.menuList?.length} fold={true}>
        <div css={menuWrapper}>
          {props.menuList
            ?.filter((_, idx) => idx < 3)
            .map((menu) => (
              <Menu
                key={menu.menuId}
                imgSrc={menu.imageUrl}
                name={menu.name}
                price={menu.price}
                isBottom={false}
              />
            ))}
        </div>
        <div css={moreBtnWrapper}>
          <button onClick={() => setOpen(true)} css={moreBtn}>
            <span>더보기</span>
            <RightIcon width={14} height={14} stroke={Colors.neutral90} />
          </button>
        </div>
      </StoreSection>
      <BottomSheet
        height="40.125rem"
        isBackButton={true}
        isXButton={false}
        open={open}
        setOpen={setOpen}
        title="메뉴"
        component={<MenusBottom menuList={props.menuList} />}
      />
    </>
  );
};

export default Menus;
