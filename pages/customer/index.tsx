import React from "react";

import Layout from "customer/components/common/layout";
import Location from "customer/components/main/Location";
import Sort from "customer/components/main/Sort";
import Category from "customer/components/main/Category";

const Customer = () => {
  return (
    <Layout title="단골손님">
      <Location />
      <Category />
      <Sort />
    </Layout>
  );
};

export default Customer;
