import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "./AuthContext";
import { axiosFetchChats } from "../axios/axiosClient";
import { getLocalStorage } from "../hooks/storageHooks";
import { useAuthUser } from "../hooks/contextHooks";

type ChatAuth = {
  chats: Chat[] | null;
  setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
  selectedChat: Chat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  fetchChatAgain: boolean;
  setFetchChatAgain: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [fetchChatAgain, setFetchChatAgain] = useState(false);
  const auth = useAuthUser();
  // console.log("context:", auth);

  const fetchChats = async () => {
    let res = await axiosFetchChats();
    setChats(res);
  };

  useEffect(() => {
    const userInfo = getLocalStorage("userInfo");
    if (userInfo) {
      fetchChats();
    }
  }, [auth?.user, fetchChatAgain]);

  const value = {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchChatAgain,
    setFetchChatAgain,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatsProvider;
