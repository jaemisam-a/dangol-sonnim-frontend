import React, { useState } from "react";

import BottomSheet from "common/bottomSheet";
import EditProfile from "customer/my/editProfile";
import Info, { LoginType } from "customer/my/info";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = [
    {
      nickname: "물고기1234",
      loginInfo: "kakao" as LoginType,
    },
  ];

  return (
    <>
      <Info user={user[0]} openProfile={() => setIsOpen(true)} />
      <BottomSheet
        open={isOpen}
        setOpen={setIsOpen}
        title="내 정보"
        height="33.75rem"
        isBackButton={false}
        isXButton={true}
        component={<EditProfile />}
      />
    </>
  );
};

export default Profile;
