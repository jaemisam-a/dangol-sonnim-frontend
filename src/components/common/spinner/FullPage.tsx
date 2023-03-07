import React from "react";
import { css } from "@emotion/react";

import Spinner from "common/spinner";

const HEADER_HEIGHT = "3.25rem";

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${HEADER_HEIGHT});
`;

const FullPageSpinner = () => {
  return (
    <div css={wrapper}>
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
