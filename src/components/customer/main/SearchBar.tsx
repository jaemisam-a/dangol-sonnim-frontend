import React from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import { Colors } from "styles/common";
import Search from "public/icons/Search.svg";

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
`;

const searchIcon = css`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

const SearchBar = () => {
  const router = useRouter();

  const goToSearch = () => {
    router.push("/customer/search");
  };

  return (
    <div css={inputWrapper}>
      <input
        type="search"
        placeholder="음식 이름, 구독권 이름 검색"
        css={input}
        onFocus={goToSearch}
      />
      <Search css={searchIcon} width={24} height={24} stroke={Colors.amber50} />
    </div>
  );
};

export default SearchBar;
