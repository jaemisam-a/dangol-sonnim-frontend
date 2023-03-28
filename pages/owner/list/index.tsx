import React, { useState } from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import Table from "common/table";
import SearchBar from "common/input/search";
import Pagination from "common/pagination";
import { Colors, Texts } from "styles/common";

const wrapper = css`
  padding: 1.5rem 1.25rem 0 1.25rem;
`;

const tableCaption = css`
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
  color: ${Colors.neutral80};
  ${Texts.B3_15_M2}
`;

const paginationWrapper = css`
  margin-top: 1.75rem;
  display: flex;
  justify-content: center;
`;

const DUMMY_DATA = {
  head: ["닉네임", "구독권", "방문횟수", "전화번호"],
  contents: [
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
    ["홈런볼맛있어", "(월간)모든 메뉴 사이즈업", "16회", "010-1234-1234"],
  ],
};

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const searchSubmit = () => {
    // TODO: 닉네임 검색하는 API 적용
  };

  return (
    <Layout title="회원리스트" isLogo={true}>
      <div css={wrapper}>
        <SearchBar
          isCustomer={false}
          placeholder="닉네임 검색"
          isBackgroundWhite={true}
          mutate={searchSubmit}
        />
        <div css={tableCaption}>전체 39건</div>
        <Table contents={DUMMY_DATA.contents} head={DUMMY_DATA.head} />
        <div css={paginationWrapper}>
          <Pagination
            totalPage={13}
            countPerOne={5}
            currentPage={currentPage}
            setPageNumber={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default List;
