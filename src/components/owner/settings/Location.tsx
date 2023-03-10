import React from "react";
import { css } from "@emotion/react";

import StoreSection from "owner/settings/Section";
import SettingButton from "owner/settings/SettingButton";
import MapPin from "public/icons/MapPin.svg";
import Clock from "public/icons/Clock.svg";
import EditPencil from "public/icons/EditPencil.svg";
import { Colors, Texts } from "styles/common";

type LocationProps = {
  address: string;
  detail: string;
  openHour: string;
};

const addressWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 0.813rem;
`;

const subtitleStyle = css`
  ${Texts.B2_14_M}
  color:${Colors.neutral90};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const exitInfoStyle = css`
  ${Texts.C2_12_R}
  color:#9B9B9B;
  margin-left: 1.25rem;
`;

const openHourWrapper = css`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.125rem;
  margin-bottom: 1.75rem;
`;

const openHourStyle = css`
  ${Texts.B2_14_R1}
  color:${Colors.neutral90};
`;

const Location = (props: LocationProps) => {
  return (
    <>
      <StoreSection isLocation sectionTitle="위치">
        <div css={addressWrapper}>
          <p css={subtitleStyle}>
            <MapPin />
            {props.address}
          </p>
          <p css={exitInfoStyle}>{props.detail}</p>
        </div>
        <div css={openHourWrapper}>
          <span css={subtitleStyle}>
            <Clock />
            영업시간
          </span>
          <span css={openHourStyle}>{props.openHour}</span>
        </div>
      </StoreSection>
      <SettingButton
        heading="가게 정보 설정"
        icon={<EditPencil />}
        action={() => alert("가게 정보 설정!")}
      />
    </>
  );
};

export default Location;
