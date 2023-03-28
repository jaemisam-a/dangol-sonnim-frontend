import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useRef } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import { Colors } from "styles/common";
import Search from "public/icons/etc/search.svg";

type SearchBarProps = {
  isBackgroundWhite?: boolean;
  isCustomer: boolean;
  placeholder: string;
  setState?: Dispatch<SetStateAction<string>>;
  mutate?: any;
};

const inputWrapper = css`
  position: relative;
  width: 100%;
`;

const input = (isBackgroundWhite: boolean) => css`
  background-color: ${isBackgroundWhite ? Colors.white : Colors.neutral20};
  border: ${isBackgroundWhite ? `1px solid ${Colors.neutral30}` : "none"};
  border-radius: 4px;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 3.25rem 0.5rem 0.75rem;

  &:focus {
    outline: none;
  }
`;

const searchIcon = css`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

const SearchBar = (props: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const goToSearch = () => {
    router.push("/search");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!props.setState) return;
    props.setState(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter" && target.value != "") {
      props.mutate();
    }
  };

  const onClickSearch = () => {
    const input = inputRef.current as HTMLInputElement;
    if (input.value !== "") {
      props.mutate();
    }
  };

  return (
    <div css={inputWrapper}>
      <input
        type="search"
        placeholder={props.placeholder}
        ref={inputRef}
        css={input(props.isBackgroundWhite as boolean)}
        onChange={handleSearch}
        onFocus={props.isCustomer ? goToSearch : undefined}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClickSearch}>
        <Search css={searchIcon} width={24} height={24} stroke={Colors.amber50} />
      </button>
    </div>
  );
};

export default SearchBar;
