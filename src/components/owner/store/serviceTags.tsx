import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useStore } from "zustand";

import Tag from "common/tag/tagOwner";
import { Colors, Texts } from "styles/common";
import useMyStoreInfo from "src/store/storeInfo";

const desc = css`
  color: ${Colors.neutral60};
  ${Texts.C2_12_R}
`;

const tagExampleWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  row-gap: 0.75rem;
  margin: 0.5rem 0 1rem;
`;

const inputWrapper = css`
  margin-bottom: 0.25rem;
  width: 100%;
  border: 1px solid ${Colors.neutral30};
  border-radius: 0.25rem;
  padding: 0.625rem 0.75rem;
  display: flex;

  div {
    display: flex;
  }

  input {
    border: none;
    outline: none;
  }
`;

const tagsWrapper = css`
  margin-right: 0.75rem;
  gap: 0.75rem;
`;

const inputStyle = css`
  width: 100%;
  ${Texts.C2_12_M}
`;

const ServiceTags = () => {
  const { tags, setGlobalStoreInfo } = useStore(useMyStoreInfo);

  const tagExample = [
    "음료제공",
    "가격할인",
    "사이즈업",
    "밑반찬",
    "시간연장",
    "우선예약",
    "주류제공",
  ];
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  const onTagClick = (tag: string) => {
    if (tag === "") return;
    if (tags.length >= 2) return;
    const deduplicatedTag = new Set<string>(tags.filter((el) => el !== "")).add(tag);
    setGlobalStoreInfo("tags", Array.from(deduplicatedTag));
  };

  const deleteTag = (text: string) => {
    const remainedTags = tags.filter((tag) => tag !== text);
    setGlobalStoreInfo("tags", remainedTags);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputText !== "") {
      if (e.nativeEvent.isComposing || tags.length >= 2) return;
      const newTags = new Set<string>(tags).add(inputText.trim());
      setGlobalStoreInfo("tags", Array.from(newTags));
      setInputText("");
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    /** 전역변수 tags의 초기 빈 값 제거 위해 filter 필요 */
    const fileteredTags = tags.filter((tag) => tag !== "");
    setSelectedTag(fileteredTags);
  }, [tags]);

  return (
    <div>
      <p css={desc}>최대 2개 선택/작성 가능</p>
      <div css={tagExampleWrapper}>
        {tagExample.map((tag) => (
          <button type="button" key={tag} onClick={() => onTagClick(tag)}>
            <Tag text={tag} bgColor={Colors.neutral10} />
          </button>
        ))}
      </div>
      <div css={inputWrapper}>
        {selectedTag.length !== 0 && (
          <div css={tagsWrapper}>
            {selectedTag.map((tag) => (
              <Tag key={tag} text={tag} enableDelete={true} onDeleteBtnClick={deleteTag} />
            ))}
          </div>
        )}
        <input
          type="text"
          placeholder={selectedTag ? "" : "서비스 태그 선택/작성"}
          maxLength={6}
          css={inputStyle}
          onKeyDown={onKeyDown}
          onChange={onInputChange}
          value={inputText}
        />
      </div>
      <p css={desc}>최대 6글자 작성 가능</p>
    </div>
  );
};

export default ServiceTags;
