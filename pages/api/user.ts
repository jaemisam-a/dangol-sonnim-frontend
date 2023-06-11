import axios from "axios";

type UserDataType = {
  nickname?: string;
  phoneNumber?: string;
  birth?: string;
  multipartFile?: File;
};

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem("userAccessToken");
  const queryKey = "/api/v1/customer";
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const postUser = async (userData: UserDataType) => {
  const accessToken = localStorage.getItem("userAccessToken");
  const queryKey = "/api/v1/customer/info";
  const response = await axios.post(queryKey, userData, {
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const validateUserToken = async () => {
  const queryKey = "/api/v1/customer/token-validate";
  const accessToken = localStorage.getItem("userAccessToken");
  const response = await axios.post(queryKey, { accessToken });
  return response.status;
};

export const getIsValidName = async (nickname: string) => {
  const queryKey = `/api/v1/customer/validate/${nickname}`;
  const response = await axios.get(queryKey);
  return response.data;
};

export const deleteUser = async () => {
  const accessToken = localStorage.getItem("userAccessToken");
  const queryKey = "/api/v1/customer";
  const response = await axios.delete(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const updateUser = async (userData: UserDataType) => {
  const accessToken = localStorage.getItem("userAccessToken");
  const queryKey = "/api/v1/customer/info/update";
  const response = await axios.post(queryKey, userData, {
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
