import React from "react";
import { css } from "@emotion/react";

import { Colors, Texts } from "styles/common";

export type SubsSectionProps = {
  subsId?: string;
  title: string;
  count: number;
  lastCount: number;
  visitCount: number;
  price: number;
  allSubs?: { id: string; title: string; count: number }[];
};

const wrapper = css`
  padding: 1rem 1.25rem 1.5rem 1.25rem;
`;

const titleWithButton = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const titleWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const titleInnerWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const caption = css`
  color: ${Colors.neutral80};
  ${Texts.C2_12_R}
`;

const detailButton = css`
  color: ${Colors.amber50};
`;

const smallHr = css`
  height: 1px;
  background-color: ${Colors.neutral20};
  border: 0;
  margin: 1rem 0;
`;

const allSubsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  div {
    display: flex;
    gap: 0.25rem;
    color: ${Colors.neutral80};
    ${Texts.S1_16_M}
  }
`;

const countWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  div {
    display: flex;
    gap: 0.25rem;
    color: ${Colors.neutral80};
    ${Texts.S1_16_M}
  }
`;

const amberText = css`
  color: ${Colors.amber50};
`;

const SubsSection = (props: SubsSectionProps) => {
  return (
    <section css={wrapper}>
      <div css={titleWithButton}>
        <div css={titleWrapper}>
          <div css={titleInnerWrapper}>
            <h2>{props.title}</h2>
            <span css={props.allSubs && amberText}>{props.count.toLocaleString("ko-KR")}명</span>
          </div>
          <div css={caption}>지난달 대비 {props.lastCount.toLocaleString("ko-KR")}명 증가</div>
        </div>
        {!props.allSubs && <button css={detailButton}>상세보기</button>}
      </div>
      <hr css={smallHr} />
      {props.allSubs && (
        <>
          <div css={allSubsWrapper}>
            {props.allSubs.map((sub) => (
              <div key={sub.id}>
                {sub.title} {sub.count.toLocaleString("ko-KR")}명
              </div>
            ))}
          </div>
          <hr css={smallHr} />
        </>
      )}
      <div css={countWrapper}>
        <div>
          <span>총 방문횟수</span>
          <span>{props.visitCount.toLocaleString("ko-KR")}번</span>
        </div>
        <div>
          <span>총 판매액</span>
          <span css={amberText}>{props.price.toLocaleString("ko-KR")}원</span>
        </div>
      </div>
    </section>
  );
};

export default SubsSection;
