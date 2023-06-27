import axios from "axios";

type PurchaseSubsDataType = {
  merchantUid: string;
  subscribeId: number;
  subscribeType: "COUNT" | "MONTHLY";
};

export const purchaseSubs = async (purchaseSubsData: PurchaseSubsDataType) => {
  const queryKey = "/api/v1/customer/purchase-subscribe";
  const accessToken = localStorage.getItem("userAccessToken");
  const response = await axios.post(queryKey, purchaseSubsData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
