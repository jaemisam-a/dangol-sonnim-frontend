import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import AddPlusCircle from "public/icons/AddPlusCircle.svg";

const profileWrapper = css`
  display: flex;
  justify-content: center;
`;

const profileImageWrapper = css`
  position: relative;
`;

const addImage = css`
  position: absolute;
  right: -0.438rem;
  bottom: 0.375rem;
`;

const Avatar = () => {
  return (
    <>
      <div css={profileWrapper}>
        <div css={profileImageWrapper}>
          <Image src="/images/Profile.png" alt="이미지 변경" width="80" height="80" />
          <AddPlusCircle css={addImage} />
        </div>
      </div>
    </>
  );
};

export default Avatar;
