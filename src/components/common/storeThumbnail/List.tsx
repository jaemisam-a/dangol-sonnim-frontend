import React from "react";
import { css } from "@emotion/react";

import StoreThumbnail, { ThumbnailData } from "common/storeThumbnail";

type StoreThumbnailListProps = {
  contents: ThumbnailData[];
  userPick?: string[];
  isLoading: boolean;
};

const wrapper = css`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  row-gap: 1.875rem;
  column-gap: 1rem;
`;

const StoreThumbnailList = (props: StoreThumbnailListProps) => {
  return props.isLoading ? (
    <div>Loading</div>
  ) : (
    <div css={wrapper}>
      {props.contents?.map((content) => {
        const isPick = props.userPick && props.userPick.includes(content.id);
        return <StoreThumbnail content={content} key={content.id} isPick={isPick} />;
      })}
    </div>
  );
};

export default StoreThumbnailList;
