import { createContext, ReactNode, useEffect, useState } from "react";
import { addLocalStorage, removeLocalStorage } from "../hooks/storageHooks";

export type UserAuth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export type User = {
  name: string;
  email: string;
  pic: string;
};

export const Authcontext = createContext<UserAuth | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo =
      JSON.parse(localStorage.getItem("userInfo") ?? "null") ?? "";
    setUser(userInfo);
  }, []);

  const login = async (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    addLocalStorage("userInfo", JSON.stringify(user));
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    removeLocalStorage("userInfo");
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
  };
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export default ChatProvider;
