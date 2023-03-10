import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import { css } from "@emotion/react";

import TextInput from "common/input/Text";
import Layout from "common/layout";
import FullPageSpinner from "common/spinner/FullPage";
import { Colors, Texts } from "styles/common";

type dateType = { year: string; month: string; day: string };

const wrapper = css`
  padding: 0 1.25rem;
`;

const infoText = css`
  padding-top: 4rem;
  text-align: center;
  color: ${Colors.neutral80};
  ${Texts.S1_16_M};
`;

const formWrapper = css`
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

const Business = () => {
  const { push } = useRouter();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const START_YEAR = 1900;

  const [businessNumber, setBusinessNumber] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState({
    year: currentYear.toString(),
    month: currentMonth.toString(),
    day: currentDay.toString(),
  });

  const { data, isLoading, mutate, isSuccess } = useMutation(() => {
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
      .map((value) => value.padStart(2, "0"))
      .join("");
    return formattedDate;
  };

  const onSubmit = () => {
    if (!name || !businessNumber || !date) {
      return alert("?????? ?????? ??????????????????.");
    }
    mutate();
  };

  useEffect(() => {
    if (!isSuccess) return;

    /** ????????? ???????????? ???????????? ?????? ?????? ?????? 01: Valid, 02: Invalid */
    if (data.valid === "01" && data.status.b_stt !== "?????????") {
      push(
        { pathname: "/owner/signup/complete", query: { isComplete: true } },
        "/owner/signup/complete"
      );
    }
    //TODO: ?????? ?????? ??? ?????? ?????????
  }, [isSuccess]);

  const selectElementsData = [
    {
      name: "year",
      value: date.year,
      dateArray: yearsArray,
    },
    {
      name: "month",
      value: date.month,
      dateArray: monthsArray,
    },
    {
      name: "day",
      value: date.day,
      dateArray: daysArray,
    },
  ];

  return (
    <Layout title="????????? ??????" subTitle="????????? ??????">
      <section css={wrapper}>
        <h1 css={infoText}>???????????? ????????? ????????? ????????????.</h1>
        <form css={formWrapper}>
          <div>
            <span css={labelStyle}>?????????????????????</span>
            <TextInput
              state={businessNumber}
              setState={setBusinessNumber}
              placeholder="???-??? ???????????? ?????? 10??????"
              type="number"
            />
          </div>
          <div>
            <span css={labelStyle}>???????????????</span>
            <TextInput state={name} setState={setName} type="text" />
          </div>
          <div>
            <span css={labelStyle}>????????????</span>
            <div css={dateStyle}>
              {selectElementsData.map((el) => (
                <select
                  key={el.name}
                  name={el.name}
                  id={el.name}
                  value={el.value}
                  onChange={(e) =>
                    setDate((prev) => {
                      return { ...prev, [el.name]: e.target.value };
                    })
                  }
                >
                  {el.dateArray.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </form>
        <button css={submitButtom} onClick={onSubmit}>
          ??????
        </button>
      </section>
      {isLoading && <FullPageSpinner />}
    </Layout>
  );
};

export default Business;
