import React, { useRef, KeyboardEvent } from "react";
import { css } from "@emotion/react";

import { Colors } from "styles/common";
import Search from "public/icons/Search.svg";

const inputWrapper = css`
  position: relative;
  width: fit-content;
`;

const input = css`
  background-color: ${Colors.neutral20};
  border-radius: 4px;
  width: 20rem;
  height: 2.5rem;
  padding: 0.5rem 3.25rem 0.5rem 0.75rem;
  border: 0;
  caret-color: ${Colors.amber50};

  &:focus {
    outline: solid 2px ${Colors.amber50};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: url("icons/Close.svg") center center no-repeat;
    cursor: pointer;
  }
`;

const searchIcon = css`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Todo : 검색
    }
  };

  return (
    <div css={inputWrapper}>
      <input
        type="search"
        placeholder="음식 이름, 구독권 이름 검색"
        ref={inputRef}
        css={input}
        onKeyDown={onKeyDown}
      />
      <Search css={searchIcon} />
    </div>
  );
};

export default SearchBar;
