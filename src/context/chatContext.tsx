import { createContext, ReactNode, useEffect, useState } from "react";

export type UserAuth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
};

type User = {
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
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const value = {
    user,
    isLoggedIn,
    login,
  };
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export default ChatProvider;
