import React, { Dispatch, SetStateAction, useEffect, useId, useState } from "react";
import { css } from "@emotion/react";

import Checkbox from "common/input/checkbox";
import BottomSheet from "common/bottomSheet";
import { Colors, Texts } from "styles/common";
import Terms, { TermsType } from "customer/store/menu/payment/terms";

type PaymentConsentProps = {
  isOwner?: boolean;
  isConsent: boolean;
  setIsConsent: Dispatch<SetStateAction<boolean>>;
  storeName?: string;
  consentArr: { content: string; termsType: TermsType }[];
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

  label {
    cursor: pointer;
  }
`;

const Consent = (props: PaymentConsentProps) => {
  const checkboxId = useId();

  const [isConsentDetail, setIsConsentDetail] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });
  const [selectedTerms, setSelectedTerms] = useState<TermsType>(null);

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
          {props.consentArr.map((content) => (
            <div css={inputWrapper} key={content.termsType}>
              <Checkbox
                setIsChecked={setIsConsentDetail}
                isChecked={isConsentDetail}
                objectKey={content.termsType as string}
              />
              <label onClick={() => setSelectedTerms(content.termsType)}>{content.content}</label>
            </div>
          ))}
        </div>
      </div>
      <BottomSheet
        height="40.125rem"
        isBackButton={false}
        isXButton={true}
        open={selectedTerms !== null}
        setOpen={() => setSelectedTerms(null)}
        component={
          <Terms
            isOwner={props.isOwner}
            selectedTerms={selectedTerms}
            storeName={props.storeName || ""}
          />
        }
      />
    </>
  );
};

export default Consent;
