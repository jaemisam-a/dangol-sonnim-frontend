import React from "react";
import { css } from "@emotion/react";

import StoreThumbnail, { ThumbnailData } from "common/storeThumbnail";
import Spinner from "common/spinner";
import { Colors, Texts } from "styles/common";

type StoreThumbnailListProps = {
  contents: ThumbnailData[] | null;
  userPick?: string[];
  isLoading: boolean;
};

const loadingOrEmpty = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${Colors.neutral80};
  ${Texts.S3_18_M}
`;

const thumbnails = css`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  row-gap: 1.875rem;
  column-gap: 1rem;
`;

const StoreThumbnailList = (props: StoreThumbnailListProps) => {
  if (props.isLoading) {
    return (
      <div css={loadingOrEmpty}>
        <Spinner />
      </div>
    );
  }

  if (props.contents) {
    return (
      <div css={thumbnails}>
        {props.contents?.map((content) => {
          const isPick = props.userPick && props.userPick.includes(content.id);
          return <StoreThumbnail content={content} key={content.id} isPick={isPick} />;
        })}
      </div>
    );
  }

  return <div css={loadingOrEmpty}>검색결과가 없습니다.</div>;
};

export default StoreThumbnailList;
