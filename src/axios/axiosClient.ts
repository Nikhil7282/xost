import axios from "axios";
import { User } from "../context/AuthContext";
import { getLocalStorage } from "../hooks/storageHooks";
let token = getLocalStorage("token");

const axiosClient = axios.create();
axiosClient.defaults.baseURL = "http://localhost:3000/api";
axiosClient.defaults.headers["Content-Type"] = "application/json";
axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export const setBearerToken = () => {
  axiosClient.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

export const axiosSearchUsers = async (query?: string) => {
  const res = await axiosClient.get(`/user?search=${query}`);
  return res.data;
};

export const axiosAccessChats = async (userId: string) => {
  const res = await axiosClient.post(`chats/accessChat`, {
    userId,
  });
  return res.data;
};

export const axiosFetchChats = async () => {
  setBearerToken();
  const res = await axiosClient.get(`chats/fetchChats`);
  return res.data;
};

export const axiosCreateGroup = async (groupName: string, users: User[]) => {
  const res = await axiosClient.post(`chats/createGroup`, {
    groupName,
    users: JSON.stringify(users),
  });
  return res.data;
};
export default axiosClient;
