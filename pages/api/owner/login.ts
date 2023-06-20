import axios from "axios";

type loginDataType = {
  email: string;
  password: string;
};

export const login = async (loginData: loginDataType) => {
  const queryKey = "/api/v1/boss/signin?_csrf=814279be-9831-4bdb-80b0-d2fd324467d5";
  const response = await axios.post(queryKey, loginData);
  return response.data;
};

export const validateOwnerToken = async () => {
  const queryKey = "/api/v1/boss/token-validate";
  const accessToken = localStorage.getItem("ownerAccessToken");
  const response = await axios.post(queryKey, { accessToken });
  return response.status;
};
