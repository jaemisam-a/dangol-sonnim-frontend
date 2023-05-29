import axios from "axios";

export const getSubs = async ({ subscribeId }: { subscribeId: number }) => {
  const queryKey = `/api/v1/subscribe/${subscribeId}`;
  const reponse = await axios.get(queryKey);
  return reponse.data;
};
