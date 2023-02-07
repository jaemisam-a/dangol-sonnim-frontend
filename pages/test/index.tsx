import { useState } from "react";
import styled from "@emotion/styled";

import Banner from "customer/components/Banner";
import BottomSheet from "customer/components/common/bottomsheet";
import Layout from "customer/components/common/layout";
import { Texts, Colors } from "styles/common";

const Test = () => {
  const TestDiv = styled.div`
    ${Texts.B2_14_R_line}
    color: ${Colors.amber50};
  `;

  const [open, setOpen] = useState(false);

  return (
    <Layout title="테스트 페이지">
      <TestDiv onClick={() => setOpen(true)}>안녕하세요</TestDiv>
      <Banner
        images={[
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
        ]}
      />
      <BottomSheet
        open={open}
        setOpen={setOpen}
        title="테스트"
        isBackButton={false}
        isXButton={true}
        height="300px"
        component={<div>바텀시트 테스트</div>}
      />
    </Layout>
  );
};

export default Test;
