import axios from "axios";

type GetStoreListType = {
  sigungu?: string;
  category?: string;
  kw?: string;
};

export const getStoreList = async ({ sigungu, category, kw }: GetStoreListType) => {
  const queryKey = "/api/v1/store/list";
  const response = await axios.get(queryKey, { params: { sigungu, category, kw } });
  return response.data;
};
