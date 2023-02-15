import React from "react";

import Layout from "customer/components/common/layout";
import Subs from "customer/components/store/Subs";
import Menus from "customer/components/store/Menus";

const Store = () => {
  const storeName = "정갈한솥";

  return (
    <>
      <Layout title="가게이름">
        <div>Store</div>
        <Menus />
        <Subs storeName={storeName} />
      </Layout>
    </>
  );
};

export default Store;
