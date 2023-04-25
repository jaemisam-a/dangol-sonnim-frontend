import React from "react";
import { css } from "@emotion/react";

import StoreSection from "owner/settings/section";
import SettingButton from "owner/settings/settingButton";
import MapPin from "public/icons/location/mapPin.svg";
import Clock from "public/icons/etc/clock.svg";
import PencilUnderline from "public/icons/etc/pencilUnderline.svg";
import { Colors, Texts } from "styles/common";

type LocationProps = {
  address: string;
  detail: string;
  openHour: { weeks: string; hours: string }[];
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
  align-items: flex-start;
`;

const openHourStyle = css`
  display: flex;
  flex-direction: column;
  ${Texts.B2_14_R1}
  color:${Colors.neutral90};
`;

const weeksStyle = css`
  margin-right: 0.5rem;
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
          <div css={openHourStyle}>
            {props.openHour.map((el, idx) => (
              <p key={idx}>
                <span css={weeksStyle}>{el.weeks}</span>
                <span>{el.hours}</span>
              </p>
            ))}
          </div>
        </div>
      </StoreSection>
      <SettingButton
        heading="가게 정보 설정"
        icon={<PencilUnderline />}
        action={() => alert("가게 정보 설정!")}
      />
    </>
  );
};

export default Location;
