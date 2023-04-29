import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { css } from "@emotion/react";

import Empty from "owner/settings/empty";
import StoreSection from "owner/settings/section";
import MenuCard from "common/menuCard";
import Modal from "common/modal";
import { statusType } from "common/popover";
import Dialog from "customer/my/dialog";
import { deleteMenu as deleteMenuApi } from "pages/api/owner/menu";

type MenusProps = {
  data: { id: number; name: string; img: string; price: number }[];
};

const menusWrapper = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Menus = (props: MenusProps) => {
  const { push } = useRouter();

  const { mutateAsync } = useMutation(deleteMenuApi);

  const [status, setStatus] = useState<statusType>("default");
  const [openModal, setOpenModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const deleteMenu = () => {
    mutateAsync(selectedMenu)
      .then(() => {
        alert("삭제되었습니다.");
        setOpenModal(false);
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <StoreSection
      sectionTitle="메뉴"
      setStatus={setStatus}
      btnAction={() => push("/owner/settings/menu")}
      isLocation={false}
      isEmpty={Boolean(!props.data?.length)}
    >
      {props.data?.length ? (
        <div css={menusWrapper}>
          {props.data.map((el) => (
            <MenuCard
              imgSrc={el.img}
              name={el.name}
              price={el.price}
              isBottom={false}
              key={el.id}
              isOwner={true}
              isEdit={status === "edit"}
              isDelete={status === "delete"}
              editAction={() =>
                push(
                  { pathname: "/owner/settings/menu", query: { menuId: el.id } },
                  "/owner/settings/menu"
                )
              }
              deleteAction={() => {
                setSelectedMenu(el.id);
                setOpenModal(true);
              }}
            />
          ))}
        </div>
      ) : (
        <Empty
          backgroundColor="transparent"
          description={"현재 등록된 메뉴가 없습니다.\n메뉴를 등록해주세요."}
          isTop={false}
        />
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Dialog
          onCancel={deleteMenu}
          onConfirm={() => setOpenModal(false)}
          content={{
            buttonText: { cancel: "삭제", confirm: "취소" },
            title: "해당 메뉴를 삭제하시겠습니까?",
          }}
        />
      </Modal>
    </StoreSection>
  );
};

export default Menus;
