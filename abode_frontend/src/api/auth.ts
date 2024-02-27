import { makeRequest } from "./makeRequest";

export const signup = async (data: { email: string, password: string }): Promise<any> => {
  try {
    const response = await makeRequest(`auth/signup`, `POST`, data)
    return response
  } catch (e) {
    console.log(e);
  }
};

export const signin = async (data: { email: string, password: string }): Promise<any> => {
  try {
    const response = await makeRequest(`auth/signin`, `POST`, data)
    return response
  } catch (e) {
    console.log(e);
  }
};

