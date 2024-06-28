import axios from "axios";
import { User } from "../context/AuthContext";
import { getLocalStorage } from "../hooks/storageHooks";

export const endPoint = "http://localhost:3000";
// export const endPoint = "https://xost-server.onrender.com";

const axiosClient = axios.create();
axiosClient.defaults.baseURL = `${endPoint}/api`;
axiosClient.defaults.headers["Content-Type"] = "application/json";
axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export const setBearerToken = () => {
  axiosClient.defaults.headers.common = {
    Authorization: `Bearer ${getLocalStorage("token")}`,
  };
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

export const axiosGroupName = async (chatId: string, newName: string) => {
  const res = await axiosClient.put("/chats/renameGroup", {
    chatId,
    chatName: newName,
  });
  return res.data;
};

export const axiosAddToGroup = async (chatId: string, userId: string) => {
  const res = await axiosClient.put("/chats/addToGroup", {
    userId,
    chatId,
  });
  return res.data;
};

export const axiosDeleteGroup = async (chatId: string) => {
  const res = await axiosClient.delete(`/chats/deleteChat/${chatId}`);
  return res.data;
};

export const axiosDeleteFromGroup = async (chatId: string, userId: string) => {
  const res = await axiosClient.put("chats/removeFromGroup", {
    userId,
    chatId,
  });
  return res.data;
};

export const axiosSendMessage = async (content: string, chatId: string) => {
  const res = await axiosClient.post("/messages", {
    content,
    chatId,
  });
  return res.data;
};

export const axiosGetAllMessages = async (chatId: string) => {
  const res = await axiosClient.get(`/messages/${chatId}`);
  return res.data;
};

export default axiosClient;
