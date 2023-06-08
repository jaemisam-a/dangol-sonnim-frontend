import React from "react";
import { css } from "@emotion/react";
import { QrReader } from "react-qr-reader";

import OwnerLayout from "common/layout/owner";
import ViewFinder from "public/icons/etc/viewfinder.svg";
import useToastStore from "src/store/toast";

const viewfinder = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const QR = () => {
  const { setMessage } = useToastStore();

  return (
    <OwnerLayout title="QR코드" isLogo={true}>
      <QrReader
        ViewFinder={() => <ViewFinder css={viewfinder} />}
        scanDelay={2000}
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (!!result) {
            /** TODO: 방문 확인 API */
            setMessage("방문이 확인되었습니다.", false, "info");
          } else if (!!error) {
            setMessage("QR코드 인증에 실패했습니다.\n다시 한번 확인해주세요.", false, "warning");
          }
        }}
        videoStyle={{ width: "100%", heigth: "100vh" }}
      />
    </OwnerLayout>
  );
};

export default QR;
