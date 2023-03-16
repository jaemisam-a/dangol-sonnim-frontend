import React from "react";
import Link from "next/link";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import Close from "public/icons/close/Close.svg";

const wrapper = css`
  padding: 0 1rem;
`;

const subjectWrapper = css`
  display: flex;
  justify-content: space-between;

  button {
    ${Texts.B1_13_R2}
    color:${Colors.neutral50}
  }
`;

const subject = css`
  ${Texts.B2_14_R2}
  color:${Colors.neutral70};
  padding: 0.625rem 0 0.5rem;
`;

const queryList = css`
  ${Texts.B3_15_R1}
  padding: 0.938rem 0;
`;

const recentQueries = css`
  display: flex;
  justify-content: space-between;
`;

const link = css`
  width: 100%;
`;

const margin = css`
  background-color: #f8f8f8;
  height: 2.25rem;
  padding: 0.5rem 1rem;
  text-align: end;

  & button {
    color: ${Colors.neutral60};
    ${Texts.B2_14_R2}
  }
`;

type SearchListProps = {
  isLoggedIn: boolean;
  queries: string[];
};

const SearchList = (props: SearchListProps) => {
  const deleteAll = () => {
    // TODO: 모든 쿼리 삭제
  };

  const deleteRecentQuery = () => {
    // TODO: 개별 쿼리 삭제
  };

  const offAutoSave = () => {
    // TODO: 자동저장기능 끄기
  };

  return props.isLoggedIn ? (
    <>
      <section css={wrapper}>
        <div css={[subject, subjectWrapper]}>
          <div>최근 검색어</div>
          <button onClick={deleteAll}>전체삭제</button>
        </div>
        <ul>
          {props.queries.map((query) => (
            <li key={query} css={[queryList, recentQueries]}>
              <Link css={link} href={{ pathname: "/stores", query: { query } }}>
                {query}
              </Link>
              <button onClick={deleteRecentQuery}>
                <Close width={24} height={24} stroke={Colors.neutral60} />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <div css={margin}>
        <button onClick={offAutoSave}>자동저장 끄기</button>
      </div>
    </>
  ) : (
    <>
      <section css={wrapper}>
        <div css={subject}>추천 검색어</div>
        <ul>
          {props.queries.map((query) => (
            <li key={query} css={queryList}>
              <Link css={link} href={{ pathname: "/stores", query: { query } }}>
                {query}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div css={margin}></div>
    </>
  );
};

export default SearchList;
