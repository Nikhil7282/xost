import { createContext, ReactNode, useEffect, useState } from "react";
import { addLocalStorage, removeLocalStorage } from "../hooks/storageHooks";

export type UserAuth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export type User = {
  _id?: string;
  name: string;
  email: string;
  pic: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export const Authcontext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo =
      JSON.parse(localStorage.getItem("userInfo") ?? "null") ?? "";
    setUser(userInfo);
  }, []);

  const login = async (user: User, token: string) => {
    setUser(user);
    setIsLoggedIn(true);
    addLocalStorage("userInfo", JSON.stringify(user));
    addLocalStorage("token", token);
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    removeLocalStorage("userInfo");
    removeLocalStorage("token");
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
  };
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export default AuthProvider;
