import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { css } from "@emotion/react";

import Empty from "owner/settings/empty";
import StoreSection from "owner/settings/section";
import { statusType } from "common/popover";
import StoreCoupon from "common/coupon/store";
import Modal from "common/modal";
import Dialog from "customer/my/dialog";
import { deleteSubs } from "pages/api/owner/settings";

type SubsSettingProps = {
  data: {
    id: number;
    name: string;
    count: number;
    description: string;
    price: number;
    isMain: boolean;
    tags: string[];
    storeName: string;
  }[];
};

const subsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

const SubsSetting = (props: SubsSettingProps) => {
  const { push } = useRouter();

  const { mutateAsync } = useMutation(deleteSubs, {
    onSuccess: () => {
      // TODO: 가게 정보 불러오기 refetchQueries 추가
    },
  });

  const [status, setStatus] = useState<statusType>("default");
  const [selectedSubs, setSelectedSubs] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const deleteSubscribe = async () => {
    await mutateAsync({ subscribeId: selectedSubs })
      .then(() => {
        alert("삭제되었습니다.");
        setOpenModal(false);
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <StoreSection
      sectionTitle="구독권"
      setStatus={setStatus}
      btnAction={() => push("/owner/settings/subs")}
      isLocation={false}
      isEmpty={Boolean(!props.data?.length)}
    >
      {props.data?.length ? (
        <div css={subsWrapper}>
          {props.data.map((el) => (
            <StoreCoupon
              id={el.id}
              count={el.count}
              description={el.description}
              name={el.name}
              price={el.price}
              storeName={`${el.storeName}${el.isMain ? "(대표 구독권)" : ""}`}
              isOwner={true}
              disable={true}
              key={el.id}
              isEdit={status === "edit"}
              isDelete={status === "delete"}
              editAction={() =>
                push(
                  { pathname: "/owner/settings/subs", query: { subsId: el.id } },
                  "/owner/settings/subs"
                )
              }
              deleteAction={() => {
                setSelectedSubs(el.id);
                setOpenModal(true);
              }}
            />
          ))}
        </div>
      ) : (
        <Empty
          backgroundColor="transparent"
          description={"현재 등록된 구독권이 없습니다.\n구독권을 등록해주세요."}
          isTop={false}
        />
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Dialog
          onCancel={deleteSubscribe}
          onConfirm={() => setOpenModal(false)}
          content={{
            buttonText: { cancel: "삭제", confirm: "취소" },
            title: "해당 구독권을 삭제하시겠습니까?",
          }}
        />
      </Modal>
    </StoreSection>
  );
};

export default SubsSetting;
