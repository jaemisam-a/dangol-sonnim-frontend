import React, { Dispatch, SetStateAction, useEffect } from "react";
import { css } from "@emotion/react";

import FormLabel from "common/formLabel";
import Checkbox from "common/input/checkbox";
import TextInput from "common/input/text";
import { selectStyle, Texts } from "styles/common";
import { subsType } from "pages/owner/settings/subs";

type SubsFormProps = {
  isEdit: boolean;
  subsContent: subsType;
  setSubsContent: Dispatch<SetStateAction<subsType>>;
};

const formWrapper = css`
  padding: 1.5rem 1.25rem;
`;

const checkboxWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  ${Texts.B3_15_M1}

  label {
    cursor: pointer;
  }
`;

const SubsForm = (props: SubsFormProps) => {
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
          state={props.subsContent.name}
          setState={props.setSubsContent}
          objectKey="name"
        />
      </FormLabel>
      <FormLabel label="결제주기">
        <select
          css={selectStyle}
          onChange={(e) =>
            props.setSubsContent((prev) => ({
              ...prev,
              type: e.target.value as "COUNT" | "MONTHLY",
            }))
          }
        >
          <option value="MONTHLY">월간 결제</option>
          <option value="COUNT">횟수 결제</option>
        </select>
      </FormLabel>
      {props.subsContent.type === "COUNT" && (
        <FormLabel label="제공 횟수">
          <TextInput
            type="number"
            placeholder="제공 횟수 입력"
            state={Math.floor(props.subsContent.count)}
            setState={props.setSubsContent}
            objectKey="count"
          />
        </FormLabel>
      )}
      <FormLabel label={props.subsContent.type === "MONTHLY" ? "월간 구독가격" : "구독가격"}>
        <TextInput
          type="number"
          placeholder="가격 입력"
          state={Math.floor(props.subsContent.price)}
          setState={props.setSubsContent}
          objectKey="price"
        />
      </FormLabel>
      <FormLabel label="제공혜택">
        <TextInput
          type="text"
          maxValue={80}
          placeholder="혜택 입력"
          state={props.subsContent.benefit}
          setState={props.setSubsContent}
          objectKey="benefit"
        />
      </FormLabel>
      <div css={checkboxWrapper}>
        <Checkbox
          isChecked={props.subsContent}
          setIsChecked={props.setSubsContent}
          objectKey="isMain"
          forId="isMain"
        />
        <label htmlFor="isMain">대표 구독권 등록</label>
      </div>
    </form>
  );
};

export default SubsForm;
