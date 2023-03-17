import React from "react";
import { css } from "@emotion/react";

import Spinner from "common/spinner";
import { Sizes } from "styles/common";

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${Sizes.header_height});
`;

const FullPageSpinner = () => {
  return (
    <div css={wrapper}>
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
