import React from "react";
import { useMutation } from "react-query";
import QrReader from "react-qr-reader";

import OwnerLayout from "common/layout/owner";
import useToastStore from "src/store/toast";
import { useSubsCoupon } from "pages/api/user/useSubs";

const QR = () => {
  const { setMessage } = useToastStore();

  const { mutateAsync } = useMutation(useSubsCoupon);

  return (
    <OwnerLayout title="QR코드" isLogo={true}>
      <QrReader
        showViewFinder={true}
        delay={1000}
        onScan={(data) => {
          if (data) {
            if (confirm("방문 확인을 하시겠습니까?")) {
              return mutateAsync(data)
                .then((res) => {
                  res.remainCount > 0
                    ? setMessage("방문이 확인되었습니다.", false, "info")
                    : setMessage("사용 완료된 구독권입니다.", false, "warning");
                })
                .catch((err) => {
                  setMessage("사용 완료된 구독권입니다.", false, "warning");
                });
            }
          }
        }}
        onError={() => {
          setMessage("QR코드 인증에 실패했습니다.\n다시 한번 확인해주세요.", false, "warning");
        }}
        facingMode="environment"
        style={{ width: "100%", heigth: "100vh" }}
      />
    </OwnerLayout>
  );
};

export default QR;
