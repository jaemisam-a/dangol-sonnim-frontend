import React, { ReactNode } from "react";
import { css } from "@emotion/react";

import { Texts } from "styles/common";

type StoreSectionProps = {
  children: ReactNode;
  sectionTitle: string;
};

const wrapper = css`
  padding: 1.5rem 1.25rem 0 1.25rem;
`;

const title = css`
  margin-bottom: 0.75rem;
  ${Texts.S1_16_B}
`;

const StoreSection = ({ children, sectionTitle }: StoreSectionProps) => {
  return (
    <>
      <div css={wrapper}>
        <div css={title}>{sectionTitle}</div>
        {children}
      </div>
    </>
  );
};

export default StoreSection;
