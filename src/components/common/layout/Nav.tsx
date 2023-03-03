import React from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Table from "public/icons/Table.svg";
import ListMenu from "public/icons/ListMenu.svg";
import Frame from "public/icons/Frame.svg";
import Settings from "public/icons/Settings.svg";
import { Colors, Texts } from "styles/common";

const wrapper = css`
  bottom: 0;
  position: fixed;
  border-top: 1px solid ${Colors.neutral20};
  background-color: ${Colors.white};
  max-width: 768px;
  width: 100%;
`;

const innerWarpper = css`
  display: flex;
  gap: 6.25rem;
  justify-content: center;
  padding: 0.5rem 0;
`;

const navButton = (isChecked: boolean) => css`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;

  width: 3.5rem;
  gap: 0.25rem;

  span {
    ${Texts.B1_13_R2}
    color: ${isChecked ? Colors.amber50 : Colors.neutral70}
  }
`;

const getIcon = (path: string, isChecked: boolean) => {
  const name = path.split("/").at(-1);
  const iconColor = isChecked ? Colors.amber50 : Colors.neutral70;

  switch (name) {
    case "subs":
      return <Table stroke={iconColor} />;
    case "list":
      return <ListMenu fill={iconColor} />;
    case "qr":
      return <Frame fill={iconColor} />;
    case "settings":
      return <Settings stroke={iconColor} />;
  }
};

const Nav = () => {
  const router = useRouter();

  const navArr = [
    { icon: <Table />, label: "구독현황", path: "/owner/subs" },
    { icon: <ListMenu />, label: "회원리스트", path: "/owner/list" },
    { icon: <Frame fill={Colors.amber50} />, label: "QR코드", path: "/owner/qr" },
    { icon: <Settings />, label: "가게설정", path: "/owner/settings" },
  ];

  return (
    <>
      <nav css={wrapper}>
        <div css={innerWarpper}>
          {navArr.map((el) => (
            <button
              key={el.label}
              css={navButton(router.pathname === el.path)}
              onClick={() => router.push(el.path)}
            >
              {getIcon(el.path, router.pathname === el.path)}
              <span>{el.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Nav;
