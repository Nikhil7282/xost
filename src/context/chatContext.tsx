import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "./AuthContext";
import { axiosFetchChats } from "../axios/axiosClient";
import { getLocalStorage } from "../hooks/storageHooks";
import { useAuthUser } from "../hooks/contextHooks";
import { Message } from "../components/SingleChat";

type ChatAuth = {
  chats: ChatType[] | [];
  setChats: React.Dispatch<React.SetStateAction<ChatType[] | []>>;
  selectedChat: ChatType | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatType | null>>;
  fetchChatAgain: boolean;
  setFetchChatAgain: React.Dispatch<React.SetStateAction<boolean>>;
  notification: Message[] | [];
  setNotification: React.Dispatch<React.SetStateAction<Message[] | []>>;
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

export type ChatType = {
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
  const [chats, setChats] = useState<ChatType[] | []>([]);
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [fetchChatAgain, setFetchChatAgain] = useState(false);
  const [notification, setNotification] = useState<Message[] | []>([]);
  const auth = useAuthUser();
  // console.log("context:", auth);

  const fetchChats = async () => {
    try {
      let res = await axiosFetchChats();
      setChats(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userInfo = getLocalStorage("userInfo");
    if (userInfo) {
      fetchChats();
    }
  }, [auth?.user, fetchChatAgain, selectedChat]);

  const value = {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchChatAgain,
    setFetchChatAgain,
    notification,
    setNotification,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatsProvider;
