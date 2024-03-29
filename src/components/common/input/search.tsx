import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useRef } from "react";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import { Colors } from "styles/common";
import Search from "public/icons/etc/search.svg";

type SearchBarProps = {
  isCustomer: boolean;
  placeholder: string;
  setState?: Dispatch<SetStateAction<string>>;
  mutate?: any;
  setIsSearching?: Dispatch<SetStateAction<boolean>>;
  query?: string;
  setPreviousQuery?: Dispatch<SetStateAction<string>>;
};

const inputWrapper = css`
  position: relative;
  width: 100%;
`;

const input = css`
  background-color: ${Colors.neutral20};
  border-radius: 4px;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 3.25rem 0.5rem 0.75rem;
  border: 0;

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
  const queryClient = useQueryClient();

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
      queryClient.removeQueries("location");
      props.setIsSearching && props.setIsSearching(true);
      props
        .mutate()
        .then(() => props.setPreviousQuery && props.setPreviousQuery(props.query || ""));

      props.setIsSearching && props.setIsSearching(false);
    }
  };

  const onClickSearch = () => {
    const input = inputRef.current as HTMLInputElement;
    if (input.value !== "") {
      queryClient.removeQueries("location");
      props.setIsSearching && props.setIsSearching(true);
      props
        .mutate()
        .then(() => props.setPreviousQuery && props.setPreviousQuery(props.query || ""));
      props.setIsSearching && props.setIsSearching(false);
    }
  };

  return (
    <div css={inputWrapper}>
      <input
        type="search"
        placeholder={props.placeholder}
        ref={inputRef}
        css={input}
        onChange={handleSearch}
        onFocus={props.isCustomer ? goToSearch : undefined}
        onKeyDown={!props.isCustomer ? onKeyDown : undefined}
      />
      <button onClick={!props.isCustomer ? onClickSearch : undefined}>
        <Search css={searchIcon} width={24} height={24} stroke={Colors.amber50} />
      </button>
    </div>
  );
};

export default SearchBar;
