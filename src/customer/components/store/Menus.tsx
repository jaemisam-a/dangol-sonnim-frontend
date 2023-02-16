import React, { useState } from "react";
import { css } from "@emotion/react";

import RightIcon from "public/icons/RightIcon.svg";
import { Colors, Texts } from "styles/common";
import StoreSection from "customer/components/store/Section";
import Menu from "customer/components/Menu";
import BottomSheet from "customer/components/common/bottomsheet";
import MenusBottom from "customer/components/store/MenusBottom";

const menuWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const more = css`
  ${Texts.B1_13_M1}
  color: ${Colors.neutral90};
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
`;

const Menus = () => {
  const [open, setOpen] = useState(false);

  const menuArr = [
    { id: 1, name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
    { id: 2, name: "메밀막국수", price: 850000, img: "/images/dummy/pizza.png" },
    { id: 3, name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
    { id: 4, name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
    { id: 5, name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
    { id: 6, name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
    { id: 7, name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
    { id: 8, name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
  ];

  return (
    <>
      <StoreSection sectionTitle="메뉴" menuCount={menuArr.length} fold={true}>
        <div css={menuWrapper}>
          {menuArr
            .filter((_, idx) => idx < 3)
            .map((menu) => (
              <Menu
                key={menu.id}
                imgSrc={menu.img}
                name={menu.name}
                price={menu.price}
                isBottom={false}
              />
            ))}
        </div>
        <div css={more} onClick={() => setOpen(true)}>
          더보기
          <RightIcon width={14} height={14} stroke={Colors.neutral90} />
        </div>
      </StoreSection>
      <BottomSheet
        height="40.125rem"
        isBackButton={true}
        isXButton={false}
        open={open}
        setOpen={setOpen}
        title="메뉴"
        component={<MenusBottom menus={menuArr} />}
      />
    </>
  );
};

export default Menus;
