import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import Layout from "common/layout";
import Select from "common/select";
import { SelectedType } from "pages/store/[id]/payment";
import SubsSection, { SubsSectionProps } from "owner/subs/section";
import { Colors } from "styles/common";

const DUMMY_DATA: SubsSectionProps[] = [
  {
    subsId: "123",
    title: "총 구독자",
    count: 836,
    lastCount: 32,
    visitCount: 389,
    price: 3110000,
    allSubs: [
      { id: "1", title: "전 메뉴 사이즈업", count: 1360 },
      { id: "2", title: "소주 무한리필", count: 136 },
      { id: "3", title: "생맥주 무한리필", count: 136 },
      { id: "4", title: "밑반찬 무제한 리필", count: 136 },
    ],
  },
  {
    subsId: "234",
    title: "전 메뉴 사이즈업",
    count: 1360,
    lastCount: 3000,
    visitCount: 3890,
    price: 3110000,
  },
  {
    subsId: "345",
    title: "소주 무한리필",
    count: 136,
    lastCount: 32,
    visitCount: 389,
    price: 3110000,
  },
  {
    subsId: "456",
    title: "생맥주 무한리필",
    count: 136,
    lastCount: 32,
    visitCount: 389,
    price: 3110000,
  },
  {
    subsId: "567",
    title: "밑반찬 무제한 리필",
    count: 136,
    lastCount: 32,
    visitCount: 389,
    price: 3110000,
  },
];

const wrapper = css`
  padding-top: 1.5rem;
`;

const selectWrapper = css`
  display: flex;
  gap: 0.5rem;
  padding: 0 1.25rem 0.5rem 1.25rem;

  div {
    width: 100%;
  }
`;

const bigHr = css`
  height: 0.5rem;
  background-color: ${Colors.neutral20};
  border: 0;
`;

const Subs = () => {
  const [yearList, setYearList] = useState<SelectedType[]>([]);
  const [monthList, setMonthList] = useState<SelectedType[]>([]);

  const [selectedYear, setSelectedYear] = useState<SelectedType>({ id: "", name: "" });
  const [selectedMonth, setSelectedMonth] = useState<SelectedType>({ id: "", name: "" });

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    const monthArr = [];

    for (let year = currentYear; year >= 2000; year--) {
      setYearList((prev) => [...prev, { id: String(year), name: `${year}년` }]);
    }
    for (let i = 1; i <= 12; i++) {
      monthArr.push({ id: String(i), name: `${i}월` });
    }

    setMonthList(monthArr);

    setSelectedYear({ id: String(currentYear), name: `${currentYear}년` });
    setSelectedMonth({ id: String(currentMonth), name: `${currentMonth}월` });
  }, []);

  return (
    <Layout title="구독현황" isLogo={true}>
      <div css={wrapper}>
        <div css={selectWrapper}>
          <Select list={yearList} selected={selectedYear} setSelected={setSelectedYear} />
          <Select list={monthList} selected={selectedMonth} setSelected={setSelectedMonth} />
        </div>
        {DUMMY_DATA.map((el) => (
          <div key={el.subsId}>
            <SubsSection
              count={el.count}
              lastCount={el.lastCount}
              price={el.price}
              title={el.title}
              visitCount={el.visitCount}
              allSubs={el.allSubs}
              subsId={el.subsId}
            />
            <hr css={bigHr} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Subs;
