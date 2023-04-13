import axios from "axios";

export type BHourType = {
  weeks: string;
  hours: string;
};

type RequestDataType = {
  name: string;
  phoneNumber: string;
  newAddress: string;
  sido: string;
  sigungu: string;
  bname1: string;
  bname2: string;
  detailedAddress: string;
  comments: string;
  categoryType: string;
  registerNumber: string;
  registerName: string;
  tags: string[];
  businessHours: BHourType[];
};

export const createDangolStore = async (requestData: RequestDataType) => {
  const queryKey = "/api/v1/store/create?_csrf=88917112-31cc-4278-9368-9afed4ba2b64";
  const response = await axios.post(queryKey, requestData);
  return response.data;
};
