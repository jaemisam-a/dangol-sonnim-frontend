import axios from "axios";

export type BHourType = {
  weeks: string;
  hours: string;
};

type CreateStoreReqDataType = {
  name: string;
  phoneNumber: string;
  bname1: string;
  bname2: string;
  businessHours: BHourType[];
  categoryType: string;
  comments: string;
  detailedAddress: string;
  newAddress: string;
  registerName: string;
  registerNumber: string;
  sido: string;
  sigungu: string;
  tags: string[];
};

export type CreateStoreResDataType = {
  bname1: string;
  bname2: string;
  businessHours: BHourType[];
  categoryType: string;
  comments: string;
  detailedAddress: string;
  id: string;
  newAddress: string;
  registerName: string;
  registerNumber: string;
  sido: string;
  sigungu: string;
  tags: string[];
  name: string;
};

type UploadStoreImageDataType = {
  storeId: number;
  multipartFile: FileList;
};

type UpdateStoreReqDataType = {
  requestData: CreateStoreReqDataType;
  storeId: string;
};

export const createDangolStore = async (requestData: CreateStoreReqDataType) => {
  const queryKey = "/api/v1/store/create?_csrf=957d8df2-0107-4a0e-b71e-faff75331ee0";
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(queryKey, requestData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const getMyStoreList = async () => {
  const queryKey = "/api/v1/store/my-store";
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const getStoreInfo = async (id: string) => {
  const queryKey = `/api/v1/store/find/${id}`;
  const response = await axios.get(queryKey);

  return response.data;
};

export const updateDangolStore = async ({ requestData, storeId }: UpdateStoreReqDataType) => {
  const queryKey = `/api/v1/store/update/${storeId}?_csrf=fd3ecec4-c699-442a-8463-7f8e3a024c82`;
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.patch(queryKey, requestData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

export const uploadStoreImage = async (requestData: UploadStoreImageDataType) => {
  const queryKey = "/api/v1/store/image-upload";

  const response = await axios.post(queryKey, requestData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
