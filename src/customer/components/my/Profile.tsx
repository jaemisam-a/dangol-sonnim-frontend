import React, { useState } from "react";

import BottomSheet from "customer/components/common/bottomsheet";
import EditProfile from "customer/components/my/EditProfile";
import Info from "customer/components/my/Info";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = [
    {
      nickname: "물고기1234",
      loginInfo: "kakao",
    },
    {
      nickname: "치타짱",
      loginInfo: "google",
      avatar: "/images/dummy/cheetah.jpg",
    },
  ];

  return (
    <>
      <Info user={user[0]} openProfile={() => setIsOpen(true)} />
      <Info user={user[1]} openProfile={() => setIsOpen(true)} />
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
