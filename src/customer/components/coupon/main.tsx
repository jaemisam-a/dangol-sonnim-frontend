import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import { Colors, Texts } from "styles/common";

type MainCouponProps = {
  qrImage: string;
  storeName: string;
  storeLocation: string;
  couponName: string;
  useCount: string;
  validDate: string;
};

const Wrapper = styled.div`
  box-shadow: 2px 3px 8px #f1ebe2;
  border-radius: 0.5rem;
  display: flex;
  width: fit-content;
  padding: 0.75rem;
`;

const QRWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const QRImage = styled(Image)``;

const QRButton = styled.button`
  border: 1px solid ${Colors.neutral30};
  border-radius: 0.25rem;
  padding: 0.313rem 0.5rem;
  display: flex;
  align-items: center;
  background-color: transparent;
  margin-top: 0.125rem;
  cursor: pointer;
`;

const QRButtonText = styled.span`
  ${Texts.B1_13_M2};
  color: ${Colors.neutral80};
`;

const ContentsWrapper = styled.div`
  margin-left: 0.75rem;
`;

const StoreName = styled.div`
  ${Texts.B3_15_M1};
  color: #191919;
  width: 190px;
`;

const StoreLocation = styled.div`
  ${Texts.C2_12_R};
  color: ${Colors.neutral60};
  margin-bottom: 0.25rem;
`;

const CouponName = styled.div`
  ${Texts.B3_15_B}
  color: ${Colors.black};
`;

const UseCount = styled.div`
  border: 1px solid ${Colors.amber50};
  border-radius: 7.5rem;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.063rem 0.375rem;
`;

const UseCountText = styled.span`
  ${Texts.C2_12_M};
  color: ${Colors.amber50};
`;

const ValidDate = styled.div`
  ${Texts.B1_13_R2};
  color: ${Colors.neutral70};
`;

const MainCoupon = (props: MainCouponProps) => {
  return (
    <>
      <Wrapper>
        <QRWrapper>
          <QRImage src={props.qrImage} alt="qr" width="74" height="74" />
          <QRButton>
            <Image src="/images/Enlarge.png" alt="enlargement" width="14" height="14" />
            <QRButtonText>QR 확대</QRButtonText>
          </QRButton>
        </QRWrapper>
        <ContentsWrapper>
          <StoreName>{props.storeName}</StoreName>
          <StoreLocation>{props.storeLocation}</StoreLocation>
          <CouponName>{props.couponName}</CouponName>
          <UseCount>
            <Image src="/images/Check.png" alt="check" width="16" height="16" />
            <UseCountText>{props.useCount}회 사용</UseCountText>
          </UseCount>
          <ValidDate>{props.validDate}</ValidDate>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
};

export default MainCoupon;
