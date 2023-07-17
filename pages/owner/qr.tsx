import React from "react";
import { useMutation } from "react-query";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

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
        delay={500}
        onScan={(data) => {
          if (data) {
            const isDangolQR = data?.substring(data.length - 7) === "-dangol";
            const id = data.replace("-dangol", "");
            if (!isDangolQR) return alert("단골손님 QR이 아닙니다.");
            if (confirm("방문 확인을 하시겠습니까?")) {
              return mutateAsync(id)
                .then((res) => setMessage("방문이 확인되었습니다.", false, "info"))
                .catch((err) => setMessage("사용 완료된 구독권입니다.", false, "warning"));
            }
          }
        }}
        onError={() =>
          setMessage("QR코드 인증에 실패했습니다.\n다시 한번 확인해주세요.", false, "warning")
        }
        facingMode="environment"
        style={{ width: "100%", heigth: "100vh" }}
      />
    </OwnerLayout>
  );
};

export default QR;
