import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Image from "next/image";

import { Colors, Texts } from "styles/common";
import RightIcon from "public/icons/direction/right.svg";

type LoginType = "kakao" | "google" | "apple" | "naver";

type InfoProps = {
  user: {
    nickname: string;
    loginInfo: LoginType;
    avatar?: string;
  };
  openProfile?: () => void;
};

type StateTypes = {
  type: string;
  socialName: string;
  imgSrc: string;
};

// FIXME: apple의 경우 img가 흰색이라 imgSrc 변경 필요
const LOGIN_TYPE: readonly StateTypes[] = [
  { type: "kakao", socialName: "카카오", imgSrc: "/images/loginMethod/kakao.png" },
  { type: "google", socialName: "구글", imgSrc: "/images/loginMethod/google.png" },
  { type: "apple", socialName: "Apple", imgSrc: "/images/loginMethod/appleBlack.png" },
  { type: "naver", socialName: "네이버", imgSrc: "/images/loginMethod/naver.png" },
];

const wrapper = css`
  display: flex;
  align-items: center;
  margin: 1.75rem 0 1.563rem 1.25rem;
  gap: 1.25rem;
`;

const avatarImg = css`
  border-radius: 50%;
`;

const textWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const nicknameStyle = css`
  display: flex;
  align-items: center;

  span {
    ${Texts.H1_20_B}
  }

  button {
    margin: 0;
    width: 24px;
    height: 24px;
  }
`;

const loginInfoStyle = css`
  ${Texts.B2_14_R2}
  color: ${Colors.neutral70};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Info = ({ user: { nickname, loginInfo, avatar }, openProfile }: InfoProps) => {
  const [myLoginType, setMyLoginType] = useState<StateTypes>(LOGIN_TYPE[0]);

  useEffect(() => {
    const myLoginType = LOGIN_TYPE.filter((el) => el.type === loginInfo)[0];
    setMyLoginType(myLoginType);
  }, [loginInfo]);

  return (
    <div css={wrapper}>
      <Image
        src={avatar ?? "/images/profile.png"}
        alt="avatar"
        css={avatarImg}
        width={72}
        height={72}
      />
      <div css={textWrapper}>
        <div css={nicknameStyle}>
          <span>{nickname}</span>
          {openProfile && (
            <button onClick={openProfile}>
              <RightIcon width="24" height="24" stroke="#14181F" />
            </button>
          )}
        </div>
        <div css={loginInfoStyle}>
          <Image width={20} height={20} src={myLoginType.imgSrc} alt={loginInfo} />
          <span>{myLoginType.socialName} 계정 회원</span>
        </div>
      </div>
    </div>
  );
};

export default Info;
