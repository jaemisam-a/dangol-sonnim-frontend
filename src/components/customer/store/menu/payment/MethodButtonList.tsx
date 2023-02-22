import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";

import MethodButton from "customer/store/menu/payment/MethodButton";

type MethodButtonListProps = {
  methods: { name: string; id: number }[];
  selectMethod: number;
  setSelectMethod: Dispatch<SetStateAction<number>>;
};

const wrapper = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const MethodButtonList = (props: MethodButtonListProps) => {
  return (
    <div css={wrapper}>
      {props.methods.map((method) => (
        <MethodButton
          id={method.id}
          name={method.name}
          key={method.name}
          selectMethod={props.selectMethod}
          setSelectMethod={props.setSelectMethod}
        />
      ))}
    </div>
  );
};

export default MethodButtonList;
