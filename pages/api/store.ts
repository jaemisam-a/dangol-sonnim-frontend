import axios from "axios";

export type GetStoreListType = {
  sortBy: "id" | "likeNumber";
  sigungu?: string;
  category?: string;
  kw?: string;
};

type GetStoreType = {
  storeId: number;
};

export const getStoreList = async ({ sortBy, sigungu, category, kw }: GetStoreListType) => {
  const queryKey = `/api/v1/store/list?sort=${sortBy},desc`;
  const response = await axios.get(queryKey, { params: { sigungu, category, kw } });
  return response.data;
};

export const getStore = async ({ storeId }: GetStoreType) => {
  const queryKey = `/api/v1/store/find/${storeId}`;
  const response = await axios.get(queryKey);
  return response.data;
};
