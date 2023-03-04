import React, { useRef, KeyboardEvent } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import { Colors, Texts } from "styles/common";
import ArrowLeft from "public/icons/ArrowLeft.svg";
import SearchIcon from "public/icons/Search.svg";

const searchBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${Colors.amber30};
  padding: 0.5rem 0.75rem;

  & button {
    background: transparent;
  }
`;

const inputWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & input {
    border: none;
    outline: none;
    padding: 0.5rem 0.75rem;
    width: 100%;
    height: 2.5rem;
    ${Texts.B3_15_R1}
  }
`;

const arrowLeft = css`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
`;

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter" && target.value != "") {
      onSearch(target.value);
    }
  };

  const onClick = () => {
    const input = inputRef.current as HTMLInputElement;
    if (input.value !== "") {
      onSearch(input.value);
    }
  };

  const onSearch = (value: string) => {
    push(`/stores?query=${value}`);
  };

  return (
    <header css={searchBox}>
      <button css={arrowLeft} onClick={() => push("/")}>
        <ArrowLeft stroke={Colors.neutral70} />
      </button>
      <div css={inputWrapper}>
        <input
          type="search"
          placeholder="음식 이름, 구독권 이름 검색"
          ref={inputRef}
          onKeyDown={onKeyDown}
        />
        <button onClick={onClick}>
          <SearchIcon width={24} height={24} stroke={Colors.amber50} />
        </button>
      </div>
    </header>
  );
};

export default SearchInput;
