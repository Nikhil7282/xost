import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "./AuthContext";
import { axiosFetchChats } from "../axios/axiosClient";

type ChatAuth = {
  chats: Chat[] | null;
  setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
};

type GroupAdmin = {
  _id: string;
  name: string;
  password: string;
  email: string;
  pic: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type Chat = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  groupAdmin: GroupAdmin;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export const chatContext = createContext<ChatAuth | null>(null);

const ChatsProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[] | null>(null);
  // const [selectedChat, setSelectedCjat] = useState(null);

  const fetchChats = async () => {
    let res = await axiosFetchChats();
    // console.log(res);
    setChats(res);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const value = {
    chats,
    setChats,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatsProvider;
