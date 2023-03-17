import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type AccountSectionProps = {
  title: string;
  contents: string;
  btnName?: string;
  btnAction?: () => void;
};

const wrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Colors.neutral20};
  padding: 1rem 0;
`;

const textWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const sectionTitle = css`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem;
  color: ${Colors.neutral80};
`;

const sectionContents = css`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.375rem;
  color: ${Colors.neutral90};
`;

const sectionButton = css`
  width: 4rem;
  height: 2rem;
  background-color: ${Colors.amber50};
  border-radius: 0.25rem;
  color: ${Colors.white};
  ${Texts.B3_15_M2}
`;

const AccountSection = (props: AccountSectionProps) => {
  return (
    <>
      <div css={wrapper}>
        <div css={textWrapper}>
          <div css={sectionTitle}>{props.title}</div>
          <div css={sectionContents}>{props.contents}</div>
        </div>
        {props.btnName && (
          <button onClick={props.btnAction} css={sectionButton}>
            {props.btnName}
          </button>
        )}
      </div>
    </>
  );
};

export default AccountSection;
