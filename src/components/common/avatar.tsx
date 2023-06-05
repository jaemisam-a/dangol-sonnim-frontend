import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import AddPlusCircle from "public/icons/add/plusCircleFilled.svg";

type AvatarPropsType = {
  imageUrl?: string;
  setImage: Dispatch<SetStateAction<File | undefined>>;
};

const profileWrapper = css`
  display: flex;
  justify-content: center;
`;

const profileImageWrapper = css`
  position: relative;
`;

const fileInput = css`
  display: none;
`;

const fileLabel = css`
  cursor: pointer;
`;

const addImage = css`
  position: absolute;
  right: -0.438rem;
  bottom: 0.375rem;
`;

const image = css`
  object-fit: cover;
  border-radius: 100%;
`;

const Avatar = (props: AvatarPropsType) => {
  const [profileImg, setProfileImg] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // FIXME: 추후 Backend에서 이미지 업로드 시 필요한 데이터 파악하여 수정예정
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
      <div css={profileWrapper}>
        <div css={profileImageWrapper}>
          <input
            type="file"
            css={fileInput}
            id="file"
            onChange={handleInput}
            multiple={false}
            accept="image/*"
          />
          <label htmlFor="file" css={fileLabel}>
            {profileImg ? (
              <Image src={profileImg} alt="프로필 이미지" width={80} height={80} css={image} />
            ) : (
              <>
                <Image src="/images/profile.png" alt="이미지 변경" width="80" height="80" />
                <AddPlusCircle css={addImage} />
              </>
            )}
          </label>
        </div>
      </div>
    </>
  );
};

export default Avatar;
