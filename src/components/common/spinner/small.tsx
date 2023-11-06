import React from "react";
import { css } from "@emotion/react";

import Spinner from "common/spinner";

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30rem;
`;

const SmallSpinner = () => {
  return (
    <div css={wrapper}>
      <Spinner />
    </div>
  );
};

export default SmallSpinner;
