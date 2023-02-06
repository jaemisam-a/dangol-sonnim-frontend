import styled from "@emotion/styled";
import Banner from "customer/components/Banner";
import { Texts, Colors } from "styles/common";

const Test = () => {
  const TestDiv = styled.div`
    ${Texts.B2_14_R_line}
    color: ${Colors.amber50};
  `;
  return (
    <>
      <TestDiv>안녕하세요</TestDiv>
      <Banner
        images={[
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
        ]}
      />
    </>
  );
};

export default Test;
