import React, { useState } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import TabContent from "customer/my/TabContent";

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
`;

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabArr = ["내가 구독한 쿠폰", "좋아요 가게"];

  return (
    <>
      <section css={wrapper}>
        <div css={tabsWrapper}>
          {tabArr.map((tab, idx) => (
            <button key={tab} css={tabBtn(selectedTab === idx)} onClick={() => setSelectedTab(idx)}>
              {tab}
            </button>
          ))}
        </div>
        <TabContent selectedTab={selectedTab} />
      </section>
    </>
  );
};

export default Tab;
