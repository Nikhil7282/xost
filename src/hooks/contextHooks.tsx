import { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { chatContext } from "../context/ChatContext";
import { socketContext } from "../context/SocketContext";

export const useAuthUser = () => useContext(Authcontext);
export const useAuthChat = () => useContext(chatContext);
export const useSocket = () => useContext(socketContext);
