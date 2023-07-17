import axios from "axios";

type EditOwnerAccountType = {
  phoneNumber: string;
  marketingAgreement: boolean;
};

type PostOwnerAccountType = {
  account: string;
  accountHolder: string;
  bank: string;
};

type ChangeOwnerPasswordType = {
  email: string;
  password: string;
};

export const getOwnerAccount = async () => {
  const accessToken = localStorage.getItem("ownerAccessToken");
  const queryKey = "/api/v1/boss";
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const editOwnerAccount = async ({
  phoneNumber,
  marketingAgreement,
}: EditOwnerAccountType) => {
  const accessToken = localStorage.getItem("ownerAccessToken");
  const queryKey = "/api/v1/boss?_csrf=ff2dba70-94b7-45b8-b924-4f974757dbfe";
  const response = await axios.patch(
    queryKey,
    { phoneNumber, marketingAgreement },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

export const postOwnerAccount = async ({ account, accountHolder, bank }: PostOwnerAccountType) => {
  const accessToken = localStorage.getItem("ownerAccessToken");
  const queryKey = "/api/v1/boss/register-account?_csrf=a3e71c92-dc89-413b-b564-3c62d43f21de";
  const response = await axios.post(
    queryKey,
    { account, accountHolder, bank },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

export const deleteOwnerAccount = async () => {
  const accessToken = localStorage.getItem("ownerAccessToken");
  const queryKey = "/api/v1/boss";
  const response = await axios.delete(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const changeOwnerPassword = async ({ email, password }: ChangeOwnerPasswordType) => {
  const queryKey = "/api/v1/boss/password?_csrf=4f7977ac-a961-4872-8b29-b640a2655c58";
  const response = await axios.put(queryKey, { email, password });
  return response.data;
};
