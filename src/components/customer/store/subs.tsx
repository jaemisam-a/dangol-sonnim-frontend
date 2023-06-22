// FIXME: store api 연결 시 type any 해결
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import StoreCoupon from "common/coupon/store";
import StoreSection from "customer/store/section";
import { Colors, Texts } from "styles/common";

type SubsProps = {
  subsList: {
    isTop: boolean;
    intro: string;
    name: string;
    price: number;
    useCount: number;
    type: "MONTHLY" | "COUNT";
  }[];
};

type isCheckedType = {
  [index: string]: boolean;
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

const noSubsText = css`
  ${Texts.B3_15_M2}
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
        {props.subsList.length > 0 ? (
          <>
            <div css={subsWrapper}>
              {props.subsList.map((el: any) => (
                <StoreCoupon
                  id={el.subscribeId}
                  name={el.name}
                  count={el.useCount}
                  description={el.intro}
                  price={el.price}
                  storeName={el.storeName}
                  key={el.subscribeId}
                  checked={isChecked}
                  setChecked={setIsChecked}
                  type={el.type}
                  isTop={el.isTop}
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
          </>
        ) : (
          <p css={noSubsText}>구독권이 없습니다.</p>
        )}
      </StoreSection>
    </>
  );
};

export default Subs;
