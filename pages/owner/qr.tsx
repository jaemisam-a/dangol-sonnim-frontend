import React from "react";

import Layout from "common/layout";
import { QrReader } from "react-qr-reader";
import { css } from "@emotion/react";
import ViewFinder from "public/icons/etc/viewfinder.svg";

const viewfinder = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const QR = () => {
  // const [data, setData] = useState("No result");

  return (
    <Layout title="QR코드" isLogo={true}>
      <QrReader
        ViewFinder={() => <ViewFinder css={viewfinder} />}
        scanDelay={500}
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (!!result) {
            // setData(result?.text);
            console.info(result);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        // videoStyle={{ width: "100%", heigth: "100vh" }}
      />
    </Layout>
  );
};

export default QR;
