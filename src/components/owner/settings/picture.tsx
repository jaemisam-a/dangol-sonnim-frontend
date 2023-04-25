import React, { ChangeEvent, RefObject } from "react";
// import { useMutation } from "react-query";

import Empty from "owner/settings/empty";
import SettingButton from "owner/settings/settingButton";
import { Colors } from "styles/common";
import Camera from "public/icons/etc/camera.svg";
// import { uploadStoreImage } from "pages/api/owner/dangolStore";

const Picture = () => {
  // const { mutateAsync } = useMutation(uploadStoreImage);

  const clickUploadBtn = (inputRef: RefObject<HTMLInputElement> | undefined) => {
    inputRef?.current?.click();
  };

  const onChangeImage = async (e: ChangeEvent<Element>) => {
    if (!(e.currentTarget as HTMLInputElement).files) return;

    //  FIXME: 백엔드 파일 타입 확인 후 수정하기

    // await mutateAsync({
    //   storeId: 1,
    //   multipartFile: Array.from(e.currentTarget.files),
    // });
  };

  return (
    <>
      <Empty
        backgroundColor={Colors.neutral20}
        description={"현재 등록된 가게 사진이 없습니다.\n가게 사진을 등록해주세요."}
        isTop={true}
      />
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
