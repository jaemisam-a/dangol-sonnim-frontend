import React from "react";
import { css } from "@emotion/react";

import StoreThumbnail, { ThumbnailData } from "common/storeThumbnail";

type StoreThumbnailListProps = {
  contents: ThumbnailData[];
};

const wrapper = css`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  row-gap: 1.875rem;
  column-gap: 1rem;
`;

const StoreThumbnailList = (props: StoreThumbnailListProps) => {
  return (
    <div css={wrapper}>
      {props.contents.map((content) => (
        <StoreThumbnail content={content} isLarge={true} key={content.id} />
      ))}
    </div>
  );
};

export default StoreThumbnailList;
