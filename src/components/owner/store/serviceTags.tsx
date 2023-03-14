import React, { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { css } from "@emotion/react";

import Tag from "common/tag/TagOwner";
import { Colors, Texts } from "styles/common";

type ServiceTagsProps = {
  handleTags: (tag: string[]) => void;
};

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

const ServiceTags = (props: ServiceTagsProps) => {
  const tagExample = [
    "음료제공",
    "가격할인",
    "사이즈업",
    "밑반찬",
    "시간연장",
    "우선예약",
    "주류제공",
  ];

  const [selectedTag, setSelectedTag] = useState(new Set<string>());
  const [inputText, setInputText] = useState("");

  const onTagClick = (e: MouseEvent<HTMLButtonElement>, tag: string) => {
    if (selectedTag.size >= 2) return;
    setSelectedTag((prev) => new Set(prev.add(tag)));
  };

  const deleteTag = (text: string) => {
    const copySet = new Set(selectedTag);
    copySet.delete(text);
    setSelectedTag(copySet);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputText !== "") {
      if (e.nativeEvent.isComposing || selectedTag.size >= 2) return;
      setSelectedTag((prev) => new Set(prev.add(inputText.trim())));
      setInputText("");
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.trim());
  };

  useEffect(() => {
    props.handleTags(Array.from(selectedTag));
  }, [selectedTag]);

  return (
    <div>
      <p css={desc}>최대 2개 선택/작성 가능</p>
      <div css={tagExampleWrapper}>
        {tagExample.map((tag) => (
          <button type="button" key={tag} onClick={(e) => onTagClick(e, tag)}>
            <Tag text={tag} bgColor={Colors.neutral10} />
          </button>
        ))}
      </div>
      <div css={inputWrapper}>
        {selectedTag.size !== 0 && (
          <div css={tagsWrapper}>
            {Array.from(selectedTag).map((tag) => {
              return <Tag key={tag} text={tag} enableDelete={true} onDeleteBtnClick={deleteTag} />;
            })}
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
