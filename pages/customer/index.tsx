import React from "react";
import styled from "@emotion/styled";

import Layout from "customer/components/common/layout";
import Location from "customer/components/main/Location";
import Sort from "customer/components/main/Sort";

const Wrapper = styled.div`
  background-color: white;
`;

const Customer = () => {
  return (
    <Layout title="단골손님">
      <Wrapper>
        <Location />
        <Sort />
      </Wrapper>
    </Layout>
  );
};

export default Customer;
