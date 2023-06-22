import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import Layout from "common/layout";
import FullPageSpinner from "common/spinner/fullPage";
import Subs from "customer/store/subs";
import Menus from "customer/store/menu/menus";
import Location from "customer/store/location";
import Info from "customer/store/info";
import { Colors } from "styles/common";
import { getStore } from "pages/api/store";
import { isLike, toggleLikeStore } from "pages/api/user/storeLike";

const divider = css`
  height: 0.5rem;
  border: 0;
  background-color: ${Colors.neutral10};
`;

const margin = css`
  padding-bottom: 4.25rem;
`;

const Store = () => {
  const { query } = useRouter();

  const [mainSubsDesc, setMainSubsDesc] = useState("");

  const { data: storeData, isLoading } = useQuery(
    "Stores",
    () => getStore({ storeId: Number(query.id) }),
    {
      enabled: Boolean(query.id),
    }
  );

  const { data: isLikeStore, refetch } = useQuery(
    `isLike ${storeData?.id}`,
    () => isLike(storeData?.id),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(storeData?.id),
    }
  );

  const { mutateAsync } = useMutation(toggleLikeStore, {
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (!storeData) return;
    if (storeData.subscribeResponseDTOList.length > 0) {
      const mainSubsIndex = storeData.subscribeResponseDTOList.findIndex(
        (sub: { [index: string]: string }) => sub.isTop
      );
      setMainSubsDesc(storeData.subscribeResponseDTOList[mainSubsIndex]?.name || "");
    }
  }, [storeData]);

  return (
    <Layout title={storeData?.name ?? "단골손님"}>
      {isLoading && <FullPageSpinner />}
      {storeData && (
        <>
          <Info
            infoContent={{
              name: storeData.name,
              category: storeData.categoryType,
              images: storeData.storeImageUrlList,
              description: storeData.comments,
              menu: storeData.menuResponseDTOList,
              isLike: isLikeStore?.isLike,
              mainSubsDesc: mainSubsDesc,
            }}
            onPick={() => mutateAsync(storeData.id)}
          />
          <hr css={divider} />
          <Location
            address={storeData.newAddress}
            detail={storeData.detailedAddress}
            businessHours={storeData.businessHours}
          />
          <hr css={divider} />
          <Menus menuList={storeData.menuResponseDTOList} />
          <hr css={divider} />
          <Subs subsList={storeData.subscribeResponseDTOList} />
          <div css={margin} />
        </>
      )}
    </Layout>
  );
};

export default Store;
