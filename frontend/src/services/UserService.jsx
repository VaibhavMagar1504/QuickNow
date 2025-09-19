import axios from "axios";

const BASE_URL= "http://localhost:8071/user";

 export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/userReg`, userData);
};

export const loginUser = async (loginData) => {
  return await axios.post(`${BASE_URL}/userLogin`, loginData);
};