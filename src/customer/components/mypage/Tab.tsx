import { css } from "@emotion/react";
import React, { useState } from "react";
import { Colors, Texts } from "styles/common";

const wrapper = css`
  display: flex;
`;

const tabBtn = (tab: boolean) => css`
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tab ? Colors.amber50 : Colors.neutral40};
  border-bottom: ${tab ? `3px solid ${Colors.amber50}` : `1px solid ${Colors.neutral40}`};
  cursor: pointer;
  ${Texts.B3_15_B}
`;

const Tab = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabArr = ["내가 구독한 쿠폰", "좋아요 가게"];

  return (
    <>
      <div css={wrapper}>
        {tabArr.map((tab, idx) => (
          <div key={idx} css={tabBtn(selectedTab === idx)} onClick={() => setSelectedTab(idx)}>
            {tab}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tab;
