import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import BottomSheet from "common/bottomSheet";
import FullPageSpinner from "common/spinner/fullPage";
import EditProfile from "customer/my/editProfile";
import Info from "customer/my/info";
import { getUserInfo } from "pages/api/user";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { push } = useRouter();

  const { data, isFetching } = useQuery("userInfo", getUserInfo, { refetchOnWindowFocus: false });

  useEffect(() => {
    if (!data) return;
    if (!data.providerType) push("/");
  }, [data]);

  if (isFetching) return <FullPageSpinner />;

  return (
    <>
      <Info
        user={{
          loginInfo: data?.providerType,
          nickname: data?.nickname,
          avatar: data?.profileImageUrl,
        }}
        openProfile={() => setIsOpen(true)}
      />
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
