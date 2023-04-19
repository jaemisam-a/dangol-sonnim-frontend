import React, { Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";

import CloseLarge from "public/icons/close/closeLarge.svg";
import Right from "public/icons/direction/right.svg";
import LinkIcon from "public/icons/etc/link.svg";
import PlusCircle from "public/icons/add/plusCircle.svg";
import { Colors, Texts } from "styles/common";

type MyInfoProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

const buttonWrapper = css`
  padding: 1.25rem 1.25rem 0 1.25rem;
  width: 100%;
  text-align: end;
`;

const emailWrapper = css`
  display: flex;
  align-items: center;
  padding: 0.5rem 2.813rem 1.75rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;

  p {
    margin-left: 1rem;
    ${Texts.S3_18_B}
    color: ${Colors.neutral80};
    width: 70%;
    word-wrap: break-word;
  }

  a {
    display: flex;
  }
`;

const storeListWrapper = css`
  padding: 1rem 1.25rem;
  ${Texts.S1_16_M}

  p {
    margin-bottom: 1rem;
  }
`;

const storeList = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const storeLink = (isCurrent: boolean) => css`
  ${isCurrent ? Texts.S1_16_B : Texts.S1_16_M}

  svg {
    margin: 0 0.438rem;
    stroke: ${isCurrent ? Colors.black : Colors.neutral50};
  }

  a {
    color: ${isCurrent ? Colors.black : Colors.neutral50};
  }
`;

const addButton = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  width: 100%;
  color: ${Colors.amber50};
  ${Texts.S1_16_M};
`;

const MyInfo = (props: MyInfoProps) => {
  const owner = {
    name: "김두말",
    email: "owner@gmail.com",
    phoneNo: "010-1234-1234",
    businessNo: "1234567890",
    bankInfo: { name: "국민은행", accountNo: "1234567890" },
    stores: ["지파이", "미스사이공"],
    currentStoreId: "지파이",
  };

  return (
    <div>
      <div css={buttonWrapper}>
        <button onClick={() => props.onClose(false)}>
          <CloseLarge />
        </button>
      </div>
      <div css={emailWrapper}>
        <Image src="/images/profile.png" width={40} height={40} alt="프로필 이미지" />
        <p>{owner.email}</p>
        <Link href="/owner/account">
          <Right width={20} height={20} stroke={Colors.neutral80} />
        </Link>
      </div>
      <section css={storeListWrapper}>
        <p>내 가게</p>
        <div css={storeList}>
          {owner.stores.map((store) => (
            // FIXME: 링크 이동 경로, 현재 클릭한 스토어 판단 로직 수정필요
            <span key={store} css={storeLink(store === owner.currentStoreId)}>
              <LinkIcon />
              <Link href={`/settings/${store}`}>{store}</Link>
            </span>
          ))}
        </div>
        <Link href="/owner/mystore" css={addButton}>
          <span>내 가게 추가 등록</span>
          <PlusCircle />
        </Link>
      </section>
    </div>
  );
};

export default MyInfo;
