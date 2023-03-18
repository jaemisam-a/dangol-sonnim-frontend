import React, { ChangeEvent, useId, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import Camera from "public/icons/etc/camera.svg";

const wrapper = css`
  width: 6.5rem;
  height: 6.5rem;
  background-color: #d9d9d9;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const cameraWrapper = css`
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: flex-end;
  padding: 0.25rem 0.5rem;
`;

const fileInput = css`
  display: none;
`;

const image = css`
  object-fit: cover;
  border-radius: 0.25rem;
`;

const ImageManage = () => {
  const fileId = useId();

  const [profileImg, setProfileImg] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // FIXME: 추후 Backend에서 이미지 업로드 시 필요한 데이터 파악하여 수정예정
    if (!e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files?.[0] as Blob);
    reader.onloadend = () => {
      setProfileImg(reader.result as string);
    };
  };

  return (
    <>
      <label htmlFor={fileId} css={wrapper}>
        {profileImg ? (
          <Image src={profileImg} alt="프로필 이미지" width={104} height={104} css={image} />
        ) : (
          <div css={cameraWrapper}>
            <Camera />
          </div>
        )}
      </label>
      <input
        css={fileInput}
        onChange={handleInput}
        type="file"
        id={fileId}
        multiple={false}
        accept="image/*"
      />
    </>
  );
};

export default ImageManage;
