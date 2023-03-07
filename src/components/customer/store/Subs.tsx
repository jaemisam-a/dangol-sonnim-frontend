import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import StoreCoupon from "common/coupon/Store";
import StoreSection from "customer/store/Section";
import { Colors, Texts } from "styles/common";
import { subsType } from "pages/api/store";

type SubsProps = {
  storeName: string;
  subsList: subsType;
};

type isCheckedType = {
  [index: string]: string;
};

const subsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const buyButton = (isOkay: boolean) => css`
  width: 100%;
  border-radius: 0.25rem;
  margin-top: 0.75rem;
  padding: 0.688rem 0;
  cursor: ${isOkay ? "pointer" : "not-allowed"};
  color: ${isOkay ? Colors.white : Colors.neutral50};
  background-color: ${isOkay ? Colors.amber50 : Colors.neutral20};
  ${Texts.S3_18_M}
`;

const Subs = (props: SubsProps) => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState<isCheckedType>({});
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);

  const isOkay = Object.values(isChecked).some((el) => el);

  useEffect(() => {
    if (!isOkay) return;

    const subs = [];
    for (const key in isChecked) {
      if (isChecked[key]) {
        subs.push(key);
      }
    }
    setSelectedSubs(subs);
  }, [isChecked]);

  return (
    <>
      <StoreSection sectionTitle="구독권" fold={false}>
        <div css={subsWrapper}>
          {props.subsList.map((el) => (
            <StoreCoupon
              id={el.id}
              name={el.name}
              count={el.count}
              description={el.description}
              price={el.price}
              storeName={props.storeName}
              key={el.id}
              setChecked={setIsChecked}
            />
          ))}
        </div>
        <button
          disabled={!isOkay}
          onClick={() =>
            router.push(
              {
                pathname: `${router.asPath}/payment`,
                query: { selectedSubs: JSON.stringify(selectedSubs) },
              },
              `${router.asPath}/payment`
            )
          }
          css={buyButton(isOkay)}
        >
          구독권 구매하기
        </button>
      </StoreSection>
    </>
  );
};

export default Subs;
