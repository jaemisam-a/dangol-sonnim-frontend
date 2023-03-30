import axios from "axios";

export const sendEmailAuth = async (email: string) => {
  const queryKey = "/api/v1/email/send-auth-code?_csrf=4606342a-7298-483f-8fc3-f7521673856f";
  const response = await axios.post(queryKey, { email });
  return response.data;
};

export const verifyEmailAuth = async (email: string, authCode: string) => {
  const queryKey = "/api/v1/email/valid";
  const response = await axios.get(queryKey, { data: { email, authCode } });
  return response.data;
};
