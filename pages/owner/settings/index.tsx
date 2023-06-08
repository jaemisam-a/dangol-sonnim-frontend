import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useStore } from "zustand";

import OwnerLayout from "common/layout/owner";
import FullPageSpinner from "common/spinner/fullPage";
import Picture from "owner/settings/picture";
import Location from "owner/settings/location";
import Menus from "owner/settings/menus";
import Subs from "owner/settings/subs";
import Info from "owner/settings/info";
import { findStore, getMyStoreList } from "pages/api/owner/dangolStore";
import { categoryIdToString } from "src/utils/category";
import useCurrentStore from "src/store/currentStore";
import SettingButton from "owner/settings/settingButton";
import PencilUnderline from "public/icons/etc/pencilUnderline.svg";
import useMyStoreInfo from "src/store/storeInfo";

const bottomPadding = css`
  height: 2rem;
`;

const Settings = () => {
  const { push } = useRouter();
  const { resetStoreInfo } = useStore(useMyStoreInfo);
  const { currentStoreId, setCurrentStoreId } = useStore(useCurrentStore);

  const { data: mystoreData, isLoading: isMyStoreLoading } = useQuery("getMyStore", getMyStoreList);
  const {
    data: findStoreData,
    isLoading: isFindStoreLoading,
    refetch,
  } = useQuery("findStoreInfo", () => findStore(currentStoreId), {
    enabled: currentStoreId !== "",
  });

  useEffect(() => {
    if (mystoreData?.length > 0 && currentStoreId === "") {
      /** 등록한 가게가 있으면 내 가게 목록 중 첫번째 스토어를 currentStore로 설정 */
      setCurrentStoreId(mystoreData[0].id);
    } else if (mystoreData?.length < 1) {
      /** 등록한 가게가 없는 경우에는 가게 정보 등록 페이지로 이동 */
      push("/owner/mystore");
    }
    /** mystore를 중간에 이탈 할 경우 전역변수를 reset해야함. mystore 페이지가 unmount 될 때 초기화하면 다음 페이지까지 입력한 값을 유지할 수 없으므로 가게 설정페이지에 들어오면 reset한다. */
    resetStoreInfo();
  }, [mystoreData]);

  useEffect(() => {
    if (currentStoreId === "") return;
    refetch();
  }, [currentStoreId]);

  if (isMyStoreLoading || isFindStoreLoading || !findStoreData || mystoreData?.length < 1) {
    return (
      <OwnerLayout title="가게설정" subTitle="가게 설정" isLogo={true}>
        <FullPageSpinner />;
      </OwnerLayout>
    );
  } else {
    return (
      <OwnerLayout title="가게설정" subTitle="가게 설정" isLogo={true}>
        <Picture images={findStoreData.storeImageUrlList} />
        <Info
          name={findStoreData.name}
          category={categoryIdToString(findStoreData.categoryType)}
          comments={findStoreData.comments}
        />
        <Location
          address={findStoreData.newAddress}
          detail={findStoreData.detailedAddress}
          openHour={findStoreData.businessHours}
        />
        <SettingButton
          heading="가게 정보 설정"
          icon={<PencilUnderline />}
          action={() =>
            push({ pathname: "/owner/mystore", query: { isEdit: true } }, "/owner/mystore")
          }
        />
        <Menus data={findStoreData.menuResponseDTOList} />
        <Subs data={findStoreData.subscribeResponseDTOList} storeName={findStoreData.name} />
        <div css={bottomPadding} />
      </OwnerLayout>
    );
  }
};

export default Settings;
