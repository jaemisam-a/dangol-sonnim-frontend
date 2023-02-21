import React from "react";
import { css } from "@emotion/react";

import StoreThumbnail, { ThumbnailData } from "common/storeThumbnail";

type StoreThumbnailListProps = {
  contents: ThumbnailData[];
};

const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1.25rem 6rem 1.25rem;
  gap: 1.875rem;
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
