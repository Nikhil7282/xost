import { useContext } from "react";
import { Authcontext } from "../context/chatContext";

export const AuthUser = () => useContext(Authcontext);
