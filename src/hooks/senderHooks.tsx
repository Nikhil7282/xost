import { User } from "../context/AuthContext";
import { getLocalStorage } from "./storageHooks";

export const useGetSender = (users: User[]) => {
  let loggedUser = getLocalStorage("userInfo");
  if (!loggedUser) {
    throw new Error("User not logged");
  }
  return users.find((user) => user._id !== loggedUser._id)?.name;
};

export const useGetSenderObject = (users: User[]) => {
  let loggedUser = getLocalStorage("userInfo");
  if (!loggedUser) {
    throw new Error("User not logged");
  }
  return users.find((user) => user._id !== loggedUser._id);
};
