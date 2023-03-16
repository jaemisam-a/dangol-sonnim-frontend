import React, { ReactNode } from "react";
import { css } from "@emotion/react";

import Kebab from "public/icons/menu/Kebab.svg";
import { Colors, Texts } from "styles/common";

type StoreSectionProps = {
  children: ReactNode;
  sectionTitle: string;
  menuCount?: number;
  isLocation: boolean;
  isEmpty?: boolean;
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

const registrationButton = css`
  color: ${Colors.amber50};
  ${Texts.B3_15_M2}
`;

const StoreSection = (props: StoreSectionProps) => {
  return (
    <>
      <div css={wrapper}>
        <div css={headerWrapper}>
          <div css={titleWrapper}>
            <div css={title}>{props.sectionTitle}</div>
            <div css={count}>{props.menuCount}</div>
          </div>
          {!props.isLocation &&
            (props.isEmpty ? (
              <button css={registrationButton}>{props.sectionTitle} 등록</button>
            ) : (
              <div>
                <Kebab />
              </div>
            ))}
        </div>
        {props.children}
      </div>
    </>
  );
};

export default StoreSection;
