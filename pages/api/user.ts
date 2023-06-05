import axios from "axios";

type UserDataType = {
  nickname: string;
  phoneNumber: string;
  birth: string;
  multipartFile: File;
};

export const getUser = async (accessToken: string) => {
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
