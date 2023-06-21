import axios from "axios";

export const toggleLikeStore = async (storeId: string) => {
  const queryKey = `/api/v1/customer/like/${storeId}`;
  const accessToken = window.localStorage.getItem("userAccessToken");
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const isLike = async (storeId: string) => {
  const queryKey = `/api/v1/customer/isLike/${storeId}`;
  const accessToken = window.localStorage.getItem("userAccessToken");
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const getLikeList = async () => {
  const queryKey = "/api/v1/store/like-list";
  const accessToken = window.localStorage.getItem("userAccessToken");
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
