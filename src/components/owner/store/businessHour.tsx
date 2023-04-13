import React, { useEffect, useState, ChangeEvent } from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";
import { BHourType } from "pages/api/owner/dangolStore";

type BusinessHourProps = {
  bHour: BHourType[];
  handleBhour: (addedBHour: BHourType[]) => void;
};

const openHourWrapper = css`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;

  div {
    min-width: 0;
  }
`;

const openDayStyle = css`
  flex-basis: 30%;
  flex-grow: 0;
`;

const openTimeStyle = css`
  flex-basis: 70%;
  flex-grow: 0;
`;

const inputStyle = css`
  ${Texts.B3_15_R1}
  padding: 0.688rem 0.75rem;
  border: 1px solid ${Colors.neutral30};
  width: 100%;
  border-radius: 0.25rem;
`;

const BusinessHour = (props: BusinessHourProps) => {
  const [bHourArr, setBHourArr] = useState([
    {
      weeks: "",
      hours: "",
    },
  ]);

  useEffect(() => {
    /**
     * 날짜-시간 한 쌍이 모두 채워지면 이 컴포넌트를 사용하는 부모 컴포넌트로 bHourArr 값을 전달하고 맨 마지막에 새로운 빈 칸을 추가합니다.
     * 칸은 8개까지 추가될 수 있습니다.
     */
    const lastField = bHourArr.at(-1) as BHourType;
    const isFilled = Object.values(lastField).every((el) => el !== "");
    const bHourLength = props.bHour.length;

    /** 새로운 빈 칸 추가 */
    if (bHourLength < 8 && isFilled) {
      setBHourArr((prev) => [...prev, { weeks: "", hours: "" }]);
    }
    props.handleBhour(bHourArr);
  }, [bHourArr]);

  const onChange = (e: ChangeEvent<HTMLInputElement>, key: keyof BHourType, idx: number) => {
    const copy = [...bHourArr];
    const findIndex = bHourArr.findIndex((_, index) => index === idx);
    copy[findIndex][key] = e.target.value;
    setBHourArr(copy);
  };

  return (
    <div>
      {bHourArr.map((el, idx) => {
        const isLastField = idx + 1 === bHourArr.length;
        const isAllFilled = el.weeks !== "" && el.hours !== "";
        return (
          <div css={openHourWrapper} key={idx}>
            <div css={openDayStyle}>
              <input
                type="search"
                value={el.weeks}
                onChange={(e) => onChange(e, "weeks", idx)}
                placeholder="월~금"
                css={inputStyle}
                required={!isLastField && isAllFilled}
              />
            </div>
            <div css={openTimeStyle}>
              <input
                type="search"
                value={el.hours}
                onChange={(e) => onChange(e, "hours", idx)}
                placeholder="09시~21시"
                css={inputStyle}
                required={!isLastField && isAllFilled}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusinessHour;
