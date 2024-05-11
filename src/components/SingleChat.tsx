/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, Typography } from "@mui/material";
import { useAuthChat, useSocket } from "../hooks/contextHooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSender, getSenderObject } from "../hooks/senderHooks";
import ProfileModel from "./Models/ProfileModel";
import UpdateGroupChatModel from "./Models/UpdateGroupChatModel";
import { useEffect, useRef, useState } from "react";
import { axiosGetAllMessages, axiosSendMessage } from "../axios/axiosClient";
import Chat from "./Chat";
import { ChatType } from "../context/ChatContext";
import { User } from "../context/AuthContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";

export type Message = {
  _id: string;
  content: string;
  chatId: ChatType;
  sender: User;
};

function SingleChat() {
  const chat = useAuthChat();
  const socket = useSocket();
  const ref = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    fetchMessages();
    socket.on("connection", () => console.log("Socket connected"));
    socket.on("disconnect", () => console.log("Socket disconnected"));
  }, [chat?.selectedChat]);

  useEffect(() => {
    if (!socket || !socket.connected) {
      console.error("Socket Error", socket);
      return;
    }
    ref.current?.focus();
    setNewMessage("");
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
      if (user === chat?.selectedChat?._id) {
        setTyping(true);
      }
    });
    socket.on("stopTyping", () => setTyping(false));
    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, typing, chat?.selectedChat]);

  const fetchMessages = async () => {
    if (!chat?.selectedChat) {
      return;
    }
    try {
      socket.emit("join-room", chat?.selectedChat._id);
      setLoading(true);
      const res = await axiosGetAllMessages(chat?.selectedChat._id || "");
      setMessages(res.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const sendMessage = async (e?: any) => {
    if ((e.key === "Enter" || e.type === "click") && newMessage) {
      try {
        setNewMessage("");
        const res = await axiosSendMessage(
          newMessage,
          chat?.selectedChat?._id || ""
        );
        if (!messages) {
          return;
        }
        socket.emit("stopTyping", chat?.selectedChat?._id);
        setMessages([...messages, res.data]);
        socket.emit("send-message", res.data);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const sendLocation = async () => {
    if (navigator.geolocation) {
      const geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      };
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setNewMessage(
            newMessage + ` https://www.google.com/maps?q=${lat},${lon}`
          );
        },
        (e) => {
          toast.error(e.message);
          console.log(e);
        },
        geolocationOptions
      );
    } else {
      console.log("Location Error");
    }
  };

  const typingHandler = async (e: any) => {
    setNewMessage(e.target.value);
    if (!typing) {
      socket.emit("typing", chat?.selectedChat?._id);
    }
    const lastTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTime;
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
                <Typography ml={1}>
                  {getSender(chat.selectedChat.users)?.toUpperCase()}
                </Typography>
                <ProfileModel user={getSenderObject(chat.selectedChat.users)} />
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
              position: "relative",
              width: "100%",
              height: "100%",
              overflowY: "scroll",
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
              <div className="relative">
                {typing ? <div className="typing-loader"></div> : <></>}

                <input
                  ref={ref}
                  value={newMessage}
                  placeholder="Enter a message"
                  className="w-full h-12 pl-14 pr-8 outline-none mr-9 rounded-xl"
                  onChange={typingHandler}
                ></input>
                <SendIcon
                  sx={{
                    position: "absolute",
                    right: "1rem",
                    top: "26.5%",
                    curser: "pointer",
                  }}
                  onClick={sendMessage}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "0.5rem",
                    top: "15%",
                    cursor: "pointer",
                    borderRadius: "0.6rem",
                    padding: "0.5rem",
                    height: "35px",
                    width: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon onClick={sendLocation} />
                </div>
              </div>
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
