import axios from "axios";

export const useSubsCoupon = async (subsId: string) => {
  const queryKey = `/api/v1/subscribe/use-subscribe/${subsId}`;
  const accessToken = localStorage.getItem("userAccessToken");
  const response = await axios.post(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
