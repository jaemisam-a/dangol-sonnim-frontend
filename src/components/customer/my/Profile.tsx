import React, { useState } from "react";

import BottomSheet from "common/BottomSheet";
import EditProfile from "customer/my/EditProfile";
import Info from "customer/my/Info";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = [
    {
      nickname: "물고기1234",
      loginInfo: "kakao",
    },
    {
      nickname: "치타짱",
      loginInfo: "apple",
      avatar: "/images/dummy/cheetah.jpg",
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
