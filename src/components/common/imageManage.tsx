import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useId, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import Camera from "public/icons/etc/camera.svg";

type ImageManageProps = {
  imageUrl?: string;
  setImage: Dispatch<SetStateAction<File>>;
};

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

const ImageManage = (props: ImageManageProps) => {
  const fileId = useId();

  const [profileImg, setProfileImg] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files?.[0] as Blob);
    reader.onloadend = () => {
      setProfileImg(reader.result as string);
    };
    props.setImage(e.target.files?.[0] as File);
  };

  useEffect(() => {
    if (!props.imageUrl) return;
    setProfileImg(props.imageUrl);
    // 이미지 주소로 이미지 객체 생성하여 저장
    // FIXME: axios로 적용
    fetch(`/static${props.imageUrl.split("static").at(-1)}`)
      .then((res) => res.blob())
      .then((blob) => {
        const imageFile = new File([blob], "image.jpg", { type: "image/jpeg" });
        props.setImage(imageFile);
      });
  }, [props.imageUrl]);

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
