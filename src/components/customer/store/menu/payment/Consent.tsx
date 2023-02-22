import React, { Dispatch, SetStateAction, useEffect, useId, useState } from "react";
import { css } from "@emotion/react";

import Checkbox from "common/input/Checkbox";
import { Colors, Texts } from "styles/common";

type PaymentConsentProps = {
  isConsent: boolean;
  setIsConsent: Dispatch<SetStateAction<boolean>>;
};

const wrapper = css`
  padding: 0 1.25rem;
`;

const allInputWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  ${Texts.C2_12_B}
  color: #191919;
  margin-bottom: 5px;
`;

const innerWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f8f8f8;
  border: 1px solid ${Colors.neutral30};
  border-radius: 0.25rem;
  padding: 1rem 0.75rem;
`;

const inputWrapper = css`
  display: flex;
  gap: 0.25rem;
  color: ${Colors.neutral90};
  ${Texts.C2_12_M_line}
`;

const PaymentConsent = (props: PaymentConsentProps) => {
  const checkboxId = useId();

  const consentArr = [
    { content: "구독취소 등 환불 안내 확인 및 동의 (필수)", objectKey: "first" },
    { content: "개인정보 수집 및 이용 동의 (필수)", objectKey: "second" },
    { content: "개인정보 제3자 제공 동의 (필수)", objectKey: "third" },
    { content: "결제대행 서비스 이용 약관 동의 (필수) 토스페이먼츠", objectKey: "fourth" },
  ];

  const [isConsentDetail, setIsConsentDetail] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const allCheckbox = (isChecked: boolean) => {
    if (isChecked) {
      setIsConsentDetail({ first: true, second: true, third: true, fourth: true });
    } else {
      setIsConsentDetail({ first: false, second: false, third: false, fourth: false });
    }
  };

  useEffect(() => {
    if (Object.values(isConsentDetail).some((el) => !el)) {
      props.setIsConsent(false);
    }
    if (Object.values(isConsentDetail).every((el) => el)) {
      props.setIsConsent(true);
    }
  }, [isConsentDetail]);

  return (
    <>
      <div css={wrapper}>
        <div css={allInputWrapper}>
          <Checkbox
            forId={checkboxId}
            setIsChecked={props.setIsConsent}
            isChecked={props.isConsent}
            extraFnc={allCheckbox}
          />
          <label htmlFor={checkboxId}>전체 동의</label>
        </div>
        <div css={innerWrapper}>
          {consentArr.map((content) => (
            <div css={inputWrapper} key={content.objectKey}>
              <Checkbox
                setIsChecked={setIsConsentDetail}
                isChecked={isConsentDetail}
                objectKey={content.objectKey}
              />
              <label>{content.content}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PaymentConsent;
