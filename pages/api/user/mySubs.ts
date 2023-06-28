import axios from "axios";

export const getMySubs = async () => {
  const queryKey = "/api/v1/subscribe/subscribe-list";
  const accessToken = window.localStorage.getItem("userAccessToken");
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
