import React, { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useMutation, useQuery } from "react-query";

import { Colors, Texts } from "styles/common";
import Tag from "common/tag/tagCustomer";
import Pick from "public/icons/etc/pick.svg";
import { categoryIdToString } from "src/utils/category";
import { isLike, toggleLikeStore } from "pages/api/user/storeLike";

export type ThumbnailData = {
  id: string;
  categoryType: string;
  tags: string[];
  img: string;
  name: string;
  sigungu: string;
  bname1: string;
  storeImageUrlList: string[];
};

type StoreThumbnailProps = {
  content: ThumbnailData;
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  cursor: pointer;

  img {
    border-radius: 0.25rem;
  }
`;

const storeInfo = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const store = css`
  ${Texts.B3_15_R2}
`;

const category = css`
  ${Texts.C2_12_R}
  color: ${Colors.neutral60};
`;

const location = css`
  ${Texts.C2_12_R}
  color: ${Colors.neutral70};
`;

const tags = css`
  display: flex;
  gap: 0.25rem;
`;

const imageWrapper = css`
  position: relative;
`;

const defaultImage = css`
  width: 9.5rem;
  height: 9.5rem;
  background-color: #666666;
`;

const pickBtn = (isLike?: boolean) => css`
  position: absolute;
  bottom: 3px;
  right: 0.25rem;

  svg {
    stroke: ${isLike ? Colors.red40 : Colors.white};
    fill: ${isLike ? Colors.red40 : ""};
  }
`;

const StoreThumbnail = ({ content }: StoreThumbnailProps) => {
  const { push } = useRouter();

  const { data: isLikeStore, refetch } = useQuery(
    `isLike ${content.id}`,
    () => isLike(content.id),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { mutateAsync } = useMutation(toggleLikeStore, {
    onSuccess: () => refetch(),
  });

  const onPickClick = (e: MouseEvent) => {
    e.stopPropagation();
    mutateAsync(content.id);
  };

  return (
    <>
      <div css={wrapper} onClick={() => push(`/store/${content.id}`)}>
        <div css={imageWrapper}>
          {content.storeImageUrlList.length ? (
            <Image src={content.storeImageUrlList[0]} alt={content.name} width={152} height={152} />
          ) : (
            // FIXME: 이미지가 없는 경우 기본 이미지를 설정함. 추후 디자인 나오면 수정 예정
            <div css={defaultImage} />
          )}

          <button css={pickBtn(isLikeStore?.isLike)} onClick={onPickClick}>
            <Pick />
          </button>
        </div>
        <div>
          <div css={storeInfo}>
            <span css={store}>{content.name}</span>
            <span css={category}>{categoryIdToString(content.categoryType)}</span>
          </div>
          <div css={tags}>
            {content.tags.map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
          </div>
          <span css={location}>
            {content.sigungu}
            &nbsp;
            {content.bname1}
          </span>
        </div>
      </div>
    </>
  );
};

export default StoreThumbnail;
