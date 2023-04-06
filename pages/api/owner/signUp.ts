import axios from "axios";

type requestDataType = {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  marketingAgreement: boolean;
};

export const signUp = async (requestData: requestDataType) => {
  const queryKey = "/api/v1/boss?_csrf=5ae901a4-52f3-40f5-bab5-4546bb7c388a";
  const response = await axios.post(queryKey, requestData);
  return response.data;
};
