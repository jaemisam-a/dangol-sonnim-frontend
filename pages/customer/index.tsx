import React from "react";
import styled from "@emotion/styled";

import Layout from "components/Common/Layout";

const Wrapper = styled.div`
  background-color: white;
`;

const Customer = () => {
  return (
    <Layout title="단골손님">
      <Wrapper>
        <div>customer</div>
        <div>customer</div>
        <div>customer</div>
      </Wrapper>
    </Layout>
  );
};

export default Customer;
