import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type TabProps = {
  tabs: string[];
  children: ReactNode;
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
`;

const tabsWrapper = css`
  display: flex;
`;

const tabBtn = (tab: boolean) => css`
  width: 100%;
  height: 3rem;
  background-color: ${Colors.white};
  color: ${tab ? Colors.amber50 : Colors.neutral40};
  border-bottom: ${tab ? `3px solid ${Colors.amber50}` : `1px solid ${Colors.neutral40}`};
  ${Texts.B3_15_B}
  white-space:pre;
`;

const Tab = ({ tabs, children, selectedTab, setSelectedTab }: TabProps) => {
  return (
    <>
      <section css={wrapper}>
        <div css={tabsWrapper}>
          {tabs.map((tab, idx) => (
            <button key={tab} css={tabBtn(selectedTab === idx)} onClick={() => setSelectedTab(idx)}>
              {tab}
            </button>
          ))}
        </div>
        <div>{children}</div>
      </section>
    </>
  );
};

export default Tab;
