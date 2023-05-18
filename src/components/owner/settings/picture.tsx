import React, { ChangeEvent, RefObject } from "react";
import { useMutation } from "react-query";
import Image from "next/image";

import Empty from "owner/settings/empty";
import SettingButton from "owner/settings/settingButton";
import { Colors } from "styles/common";
import Camera from "public/icons/etc/camera.svg";
import { uploadStoreImage } from "pages/api/owner/dangolStore";
import Slider from "common/slider";
import useCurrentStore from "src/store/currentStore";

const Picture = (props: { images: string[] }) => {
  const { mutateAsync } = useMutation(uploadStoreImage);
  const { currentStoreId } = useCurrentStore();

  const clickUploadBtn = (inputRef: RefObject<HTMLInputElement> | undefined) => {
    inputRef?.current?.click();
  };

  const onChangeImage = async (e: ChangeEvent<Element>) => {
    const currentTarget = e.currentTarget as HTMLInputElement;
    if (!currentTarget.files) return;

    await mutateAsync({
      storeId: Number(currentStoreId),
      multipartFile: currentTarget.files,
    })
      .then(() => alert("이미지 등록 완료"))
      .catch((err) => alert("1MB 이하 이미지만 등록 가능합니다."));
  };

  return (
    <>
      {props.images.length ? (
        <Slider gap="0.25rem">
          {props.images.map((img) => (
            <Image key={img} src={img} alt="가게 이미지" width={200} height={200} />
          ))}
        </Slider>
      ) : (
        <Empty
          backgroundColor={Colors.neutral20}
          description={"현재 등록된 가게 사진이 없습니다.\n가게 사진을 등록해주세요."}
          isTop={true}
        />
      )}
      <SettingButton
        inputType="file"
        heading="가게 사진 설정"
        icon={<Camera />}
        action={clickUploadBtn}
        onChange={onChangeImage}
      />
    </>
  );
};

export default Picture;
