import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import FormLabel from "common/formLabel";
import Checkbox from "common/input/Checkbox";
import TextInput from "common/input/Text";
import { selectStyle, Texts } from "styles/common";

const formWrapper = css`
  padding: 1.5rem 1.25rem;
`;

const checkboxWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  ${Texts.B3_15_M1}
`;

const SubsForm = () => {
  const [subsContent, setSubsContent] = useState({
    name: "",
    type: "monthly",
    count: 0,
    price: 0,
    benefit: "",
    isMain: true,
  });

  useEffect(() => {
    /**TODO: 구독권 수정일 때 구독권 내용 받아와서 state에 넣기
     * 수정인지 신규 생성인지 props로 받거나 push query로 받기
     **/
  }, []);

  return (
    <form css={formWrapper}>
      <FormLabel label="구독권명">
        <TextInput
          type="text"
          maxValue={20}
          placeholder="구독권명 입력"
          state={subsContent.name}
          setState={setSubsContent}
          objectKey="name"
        />
      </FormLabel>
      <FormLabel label="결제주기">
        <select
          css={selectStyle}
          onChange={(e) => setSubsContent((prev) => ({ ...prev, type: e.target.value }))}
        >
          <option value="monthly">월간 결제</option>
          <option value="count">횟수 결제</option>
        </select>
      </FormLabel>
      {subsContent.type === "count" && (
        <FormLabel label="제공 횟수">
          <TextInput
            type="number"
            placeholder="제공 횟수 입력"
            state={Math.floor(subsContent.count)}
            setState={setSubsContent}
            objectKey="count"
          />
        </FormLabel>
      )}
      <FormLabel label={subsContent.type === "monthly" ? "월간 구독가격" : "구독가격"}>
        <TextInput
          type="number"
          placeholder="가격 입력"
          state={Math.floor(subsContent.price)}
          setState={setSubsContent}
          objectKey="price"
        />
      </FormLabel>
      <FormLabel label="제공혜택">
        <TextInput
          type="text"
          maxValue={80}
          placeholder="혜택 입력"
          state={subsContent.benefit}
          setState={setSubsContent}
          objectKey="benefit"
        />
      </FormLabel>
      <div css={checkboxWrapper}>
        <Checkbox
          isChecked={subsContent}
          setIsChecked={setSubsContent}
          objectKey="isMain"
          forId="isMain"
        />
        <label htmlFor="isMain">대표 구독권 등록</label>
      </div>
    </form>
  );
};

export default SubsForm;
