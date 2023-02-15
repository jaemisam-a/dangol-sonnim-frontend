import React, { ReactNode, useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import ArrowUp from "public/icons/ArrowUp.svg";
import ArrowDown from "public/icons/ArrowDown.svg";

type StoreSectionProps = {
  children: ReactNode;
  sectionTitle: string;
  menuCount?: number;
  fold: boolean;
};

const wrapper = css`
  padding: 1.5rem 1.25rem 0 1.25rem;
`;

const headerWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const titleWrapper = css`
  display: flex;
  gap: 0.25rem;
`;

const title = css`
  ${Texts.S1_16_B}
`;

const count = css`
  ${Texts.S1_16_B}
  color: ${Colors.amber50};
`;

const arrow = css`
  height: 1.5rem;
  cursor: pointer;
`;

const StoreSection = ({ children, sectionTitle, menuCount, fold }: StoreSectionProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div css={wrapper}>
        <div css={headerWrapper}>
          <div css={titleWrapper}>
            <div css={title}>{sectionTitle}</div>
            <div css={count}>{menuCount}</div>
          </div>
          {fold && (
            <div css={arrow} onClick={() => setOpen((prev) => !prev)}>
              {open ? (
                <ArrowUp width={24} height={24} stroke={Colors.neutral70} />
              ) : (
                <ArrowDown width={24} height={24} stroke={Colors.neutral70} />
              )}
            </div>
          )}
        </div>
        {open && children}
      </div>
    </>
  );
};

export default StoreSection;
