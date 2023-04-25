import axios from "axios";

export type BHourType = {
  weeks: string;
  hours: string;
};

type createStoreDataType = {
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

type uploadStoreImageDataType = {
  storeId: number;
  multipartFile: string[];
};

export const createDangolStore = async (requestData: createStoreDataType) => {
  const queryKey = "/api/v1/store/create?_csrf=957d8df2-0107-4a0e-b71e-faff75331ee0";
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(queryKey, requestData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const getMyStore = async () => {
  const queryKey = "/api/v1/store/my-store";
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(queryKey, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const uploadStoreImage = async (requestData: uploadStoreImageDataType) => {
  const queryKey = "/api/v1/store/image-upload";
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(queryKey, requestData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
