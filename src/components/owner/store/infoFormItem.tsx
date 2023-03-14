import React, { ReactNode } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

type InfoFormItemType = {
  label: string;
  children: ReactNode;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;

  label {
    margin-bottom: 0.5rem;
    color: ${Colors.neutral80};
    ${Texts.B3_15_M2}

    span {
      color: ${Colors.amber50};
    }
  }
`;

const InfoFormItem = (props: InfoFormItemType) => {
  return (
    <section css={wrapper}>
      <label>
        {props.label}
        <span>*</span>
      </label>
      <div>{props.children}</div>
    </section>
  );
};

export default InfoFormItem;
