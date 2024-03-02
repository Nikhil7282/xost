import { io } from "socket.io-client";
import { endPoint } from "../axios/axiosClient";
import { ReactNode, createContext } from "react";

export const socket = io(endPoint);

export const socketContext = createContext(socket);

function SocketProvider({ children }: { children: ReactNode }) {
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}

export default SocketProvider;
