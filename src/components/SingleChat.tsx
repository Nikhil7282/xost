import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useAuthChat, useAuthUser, useSocket } from "../hooks/contextHooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetSender, useGetSenderObject } from "../hooks/senderHooks";
import ProfileModel from "./Models/ProfileModel";
import UpdateGroupChatModel from "./Models/UpdateGroupChatModel";
import { useEffect, useState } from "react";
import {
  axiosGetAllMessages,
  axiosSendMessage,
} from "../axios/axiosClient";
import Chat from "./Chat";

export type Message = {
  _id: string;
  content: string;
  chatId: string;
  sender: string;
};
function SingleChat() {
  const chat = useAuthChat();
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on("connected", () => setSocketConnected(true));
    fetchMessages();
  }, [chat?.selectedChat]);

  useEffect(() => {
    socket.on("receive-message", (message: Message) => {
      setMessages([...messages, message]);
    });
  }, [socket]);

  const fetchMessages = async () => {
    // console.log(socket);
    if (!chat?.selectedChat) {
      return;
    }
    try {
      const res = await axiosGetAllMessages(chat?.selectedChat._id || "");
      setMessages(res.data);
      await socket.emit("join-room", chat?.selectedChat._id);
    } catch (error) {}
  };

  const sendMessage = async (e: any) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        let res = await axiosSendMessage(
          newMessage,
          chat?.selectedChat?._id || ""
        );
        // console.log(res);
        setMessages([...messages, res.data]);
        await socket.emit("send-message", res.data);
      } catch (error: any) {
        console.log(error);
      }
    }
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
              border:"1px #f1f1f1 solid"
            }}
          >
            <Button
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => chat.setSelectedChat(null)}
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
              // border:"none",
              // borderRadius: "10px",
              overflowY: "scroll",
            }}
            p={0}
            m={0}
            bgcolor={"#E8E8E8"}
          >
            {loading ? <></> : <Chat messages={messages} />}
            <FormControl onKeyDown={sendMessage} fullWidth sx={{padding:"0 2rem", marginTop:"1rem"}}>
              {/* <TextField 
                fullWidth
                // size="large"
                sx={{height:'40px', border:"none !important"}}
                placeholder="Enter a message"
                onChange={(e) => setNewMessage(e.target.value)}
              /> */}
              <input
                placeholder="Enter a message"
                
                className="w-full h-12 pl-8 pr-8 outline-none rounded-xl"
                onChange={(e) => setNewMessage(e.target.value)}
              >
              </input>
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
