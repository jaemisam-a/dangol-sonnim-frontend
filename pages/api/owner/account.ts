import axios from "axios";

type editOwnerAccountType = {
  phoneNumber: string;
  marketingAgreement: boolean;
};

export const getOwnerAccount = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const queryKey = "/api/v1/boss";
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const editOwnerAccount = async ({
  phoneNumber,
  marketingAgreement,
}: editOwnerAccountType) => {
  const accessToken = localStorage.getItem("accessToken");
  const queryKey = "/api/v1/boss?_csrf=ff2dba70-94b7-45b8-b924-4f974757dbfe";
  const response = await axios.patch(
    queryKey,
    { phoneNumber, marketingAgreement },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};
