import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import { css } from "@emotion/react";

import TextInput from "common/input/Text";
import Layout from "common/layout";
import FullPageSpinner from "common/spinner/FullPage";
import { Colors, Texts } from "styles/common";

const wrapper = css`
  padding: 0 1.25rem;
`;

const infoText = css`
  padding-top: 4rem;
  text-align: center;
  ${Colors.neutral80}
  ${Texts.S1_16_M}
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0;
`;

const labelStyle = css`
  ${Texts.S1_16_M}
  margin-bottom: 0.25rem;
`;

const dateStyle = css`
  display: flex;
  gap: 1rem;

  & select {
    border: 1px solid ${Colors.neutral30};
    border-radius: 0.25rem;
    padding: 0.75rem 1.063rem 0.75rem 0.75rem;
    width: 100%;
    appearance: none;
    background: url("/icons/ArrowDownGrey.svg") no-repeat right 12px center;
  }
`;

const submitButtom = css`
  ${Texts.S3_18_M}
  background-color: ${Colors.amber50};
  color: ${Colors.white};
  width: 100%;
  padding: 0.938rem;
  border-radius: 0.25rem;
`;

type dateType = { year: string; month: string; day: string };

const Business = () => {
  const { push } = useRouter();

  const currentYear = new Date().getFullYear();
  const START_YEAR = 1900;

  const [businessNumber, setBusinessNumber] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState({ year: currentYear.toString(), month: "1", day: "1" });

  const { data, isLoading, mutate, isSuccess } = useMutation(async () => {
    return axios
      .post(
        `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.NEXT_PUBLIC_BUSINESS_VALIDATION_KEY}`,
        {
          businesses: [
            {
              b_no: businessNumber,
              start_dt: formatDate(date),
              p_nm: name,
            },
          ],
        }
      )
      .then((res) => res.data.data[0]);
  });

  const yearsArray = Array.from(
    { length: currentYear - START_YEAR + 1 },
    (_, index) => currentYear - index
  );
  const monthsArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const daysArray = Array.from({ length: 31 }, (_, index) => index + 1);

  const formatDate = (date: dateType) => {
    const formattedDate = Object.values(date)
      .map((value) => (value.length < 2 ? `0${value}` : value))
      .join("");

    return formattedDate;
  };

  const onSubmit = () => {
    if (!name || !businessNumber || !date) {
      return alert("모든 칸을 입력해주세요.");
    }
    mutate();
  };

  useEffect(() => {
    if (!isSuccess) return;
    if (data.valid === "01" && data.status.b_stt !== "폐업자") {
      push(
        { pathname: "/owner/signup/complete", query: { isComplete: true } },
        "/owner/signup/complete"
      );
    }
    //TODO: 인증 실패 시 모달 띄우기
  }, [isSuccess]);

  return (
    <Layout title="사업자 등록" subTitle="사업자 등록">
      <section css={wrapper}>
        <h1 css={infoText}>회원님의 사업장 인증을 해주세요.</h1>
        <div css={inputWrapper}>
          <div>
            <span css={labelStyle}>사업자등록번호</span>
            <TextInput
              width={"100%"}
              state={businessNumber}
              setState={setBusinessNumber}
              placeholder="‘-’ 입력없이 숫자 10자리"
              type="number"
            />
          </div>
          <div>
            <span css={labelStyle}>대표자성명</span>
            <TextInput width={"100%"} state={name} setState={setName} type="text" />
          </div>
          <div>
            <span css={labelStyle}>개업일자</span>
            <div css={dateStyle}>
              <select
                name="year"
                id="year"
                value={date.year}
                onChange={(e) =>
                  setDate((prev) => {
                    return { ...prev, year: e.target.value };
                  })
                }
              >
                {yearsArray.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <select
                name="month"
                id="month"
                value={date.month}
                onChange={(e) =>
                  setDate((prev) => {
                    return { ...prev, month: e.target.value };
                  })
                }
              >
                {monthsArray.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
              <select
                name="day"
                id="day"
                value={date.day}
                onChange={(e) =>
                  setDate((prev) => {
                    return { ...prev, day: e.target.value };
                  })
                }
              >
                {daysArray.map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button css={submitButtom} onClick={onSubmit}>
          인증
        </button>
      </section>
      {isLoading && <FullPageSpinner />}
    </Layout>
  );
};

export default Business;
