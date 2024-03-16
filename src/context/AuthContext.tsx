import { createContext, ReactNode, useEffect, useState } from "react";
import {
  addLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "../hooks/storageHooks";

export type UserAuth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export type User = {
  id?: string;
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
    const userInfo = getLocalStorage("userInfo");
    setUser(userInfo);
  }, []);

  const login = async (user: User, token: string) => {
    addLocalStorage("userInfo", user);
    addLocalStorage("token", token);
    setUser(user);
    setIsLoggedIn(true);
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
