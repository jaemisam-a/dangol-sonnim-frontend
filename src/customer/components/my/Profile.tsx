import React, { useState } from "react";

import BottomSheet from "customer/components/common/bottomsheet";
import EditProfile from "customer/components/my/EditProfile";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>Profile</div>
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
