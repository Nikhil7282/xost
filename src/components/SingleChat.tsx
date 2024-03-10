import {
  Avatar,
  Box,
  Button,
  FormControl,
  Stack,
  Typography,
} from "@mui/material";
import { useAuthChat, useAuthUser, useSocket } from "../hooks/contextHooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetSender, useGetSenderObject } from "../hooks/senderHooks";
import ProfileModel from "./Models/ProfileModel";
import UpdateGroupChatModel from "./Models/UpdateGroupChatModel";
import { useEffect, useState } from "react";
import { axiosGetAllMessages, axiosSendMessage } from "../axios/axiosClient";
import Chat from "./Chat";
import { ChatType } from "../context/ChatContext";
import { User } from "../context/AuthContext";
import SendIcon from "@mui/icons-material/Send";
export type Message = {
  _id: string;
  content: string;
  chatId: ChatType;
  sender: User;
};
function SingleChat() {
  const chat = useAuthChat();
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    fetchMessages();
    socket.on("connection", () => setSocketConnected(true));
    socket.on("disconnect", () => setSocketConnected(false));
  }, [chat?.selectedChat]);

  useEffect(() => {
    if (!socket || !socket.connected) {
      console.error("Socket Error");
      return;
    }
    socket.on("receive-message", (message: Message) => {
      if (!messages) {
        return;
      }
      if (chat?.selectedChat?._id != message.chatId._id) {
        if (!chat?.notification.includes(message as never)) {
          chat?.setNotification([message, ...chat.notification]);
        }
      }
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, messages, chat?.selectedChat]);

  useEffect(() => {
    socket.on("typing", (user) => {
      setTyping(true);
      // console.log("TypeId:", user);
      // console.log("Chat", chat);
      // console.log("ChatId:", chat?.selectedChat?._id);
      // if (user !== chat?.selectedChat?._id) {
      //   setTyping(false);
      // } else {
      //   setTyping(true);
      // }
    });
    socket.on("stopTyping", () => setTyping(false));
    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, typing]);

  const fetchMessages = async () => {
    if (!chat?.selectedChat) {
      return;
    }
    try {
      socket.emit("join-room", chat?.selectedChat._id);
      setLoading(true);
      console.log(chat?.selectedChat?._id);
      const res = await axiosGetAllMessages(chat?.selectedChat._id || "");
      setMessages(res.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const sendMessage = async (e: any) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        let res = await axiosSendMessage(
          newMessage,
          chat?.selectedChat?._id || ""
        );
        if (!messages) {
          return;
        }
        socket.emit("stopTyping", chat?.selectedChat?._id);
        setMessages([...messages, res.data]);
        // console.log(res.data);
        socket.emit("send-message", res.data);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const typingHandler = async (e: any) => {
    setNewMessage(e.target.value);
    if (!typing) {
      socket.emit("typing", chat?.selectedChat?._id);
    }
    let lastTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTime;
      if (timeDiff > timerLength) {
        socket.emit("stopTyping", chat?.selectedChat?._id);
      }
    }, timerLength);
  };

  return (
    <>
      {chat?.selectedChat ? (
        <>
          <Typography
            fontSize={{ xs: "28px", md: "24px" }}
            pb={0}
            p={1}
            width={"100%"}
            fontFamily={"work sans"}
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between" },
              alignItems: "center ",
              border: "1px #f1f1f1 solid",
            }}
          >
            <Button
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => chat?.setSelectedChat(null)}
            >
              <ArrowBackIcon />
            </Button>
            {!chat.selectedChat.isGroupChat ? (
              <>
                {useGetSender(chat.selectedChat.users)?.toUpperCase()}
                <ProfileModel
                  user={useGetSenderObject(chat.selectedChat.users)}
                />
              </>
            ) : (
              <>
                {chat.selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModel />
              </>
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              overflowY: "scroll",
              border: "1px solid red",
            }}
            p={0}
            m={0}
            bgcolor={"#E8E8E8"}
          >
            {loading ? <></> : <Chat messages={messages || []} />}
            <FormControl
              onKeyDown={sendMessage}
              fullWidth
              sx={{
                padding: "0 2rem",
                marginTop: "1rem",
                position: "absolute",
                bottom: "1rem",
              }}
            >
              {typing ? <div className="typing-loader"></div> : <></>}
              <input
                value={newMessage}
                placeholder="Enter a message"
                className="w-full h-12 pl-8 pr-8 mr-9 outline-none rounded-xl"
                onChange={typingHandler}
              ></input>
              <SendIcon
                sx={{ position: "absolute", right: "2.7rem", top: "28%" }}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography fontSize="4xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
