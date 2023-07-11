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
import useLoginStore from "src/store/userLogin";

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
  width: 152px;

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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${Texts.B3_15_R2}
`;

const category = css`
  ${Texts.C2_12_R}
  color: ${Colors.neutral60};
  white-space: nowrap;
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
  const { isLogin } = useLoginStore();

  const { data: isLikeStore, refetch } = useQuery(
    `isLike ${content.id}`,
    () => isLike(content.id),
    {
      refetchOnWindowFocus: false,
      enabled: isLogin,
    }
  );
  const { mutateAsync } = useMutation(toggleLikeStore, {
    onSuccess: () => refetch(),
  });

  const onPickClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isLogin) {
      return alert("로그인이 필요합니다!");
    }
    mutateAsync(content.id);
  };

  return (
    <>
      <div css={wrapper} onClick={() => push(`/store/${content.id}`)}>
        <div css={imageWrapper}>
          <Image
            src={
              content.storeImageUrlList.length ? content.storeImageUrlList[0] : "/images/empty.png"
            }
            priority={true}
            alt={content.name}
            width={152}
            height={152}
          />

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
