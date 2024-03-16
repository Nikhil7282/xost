import { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { socketContext } from "../context/SocketContext";

export const useAuthUser = () => useContext(Authcontext);
export const useAuthChat = () => useContext(ChatContext);
export const useSocket = () => useContext(socketContext);
