import { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { chatContext } from "../context/ChatContext";

export const useAuthUser = () => useContext(Authcontext);
export const useAuthChat = () => useContext(chatContext);
