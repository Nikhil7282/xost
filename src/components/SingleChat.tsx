import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useAuthChat, useAuthUser } from "../hooks/contextHooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetSender, useGetSenderObject } from "../hooks/senderHooks";
import ProfileModel from "./Models/ProfileModel";
import UpdateGroupChatModel from "./Models/UpdateGroupChatModel";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { axiosGetAllMessages, axiosSendMessage } from "../axios/axiosClient";
import Chat from "./Chat";

export type Message = {
  _id: string;
  content: string;
  chatId: string;
  sender: string;
};
function SingleChat() {
  const auth = useAuthUser();
  const chat = useAuthChat();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [chat?.selectedChat]);

  const fetchMessages = async () => {
    if (!chat?.selectedChat) {
      return;
    }
    try {
      const res = await axiosGetAllMessages(chat?.selectedChat._id || "");
      console.log(res);
      setMessages(res.data);
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
        console.log(res);
        setMessages([...messages, res.data]);
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
            fontSize={{ xs: "28px", md: "30px" }}
            pb={3}
            px={2}
            width={"100%"}
            fontFamily={"work sans"}
            sx={{
              display: "flex",
              justifyContent: { xs: "space-between" },
              alignItems: "center",
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
              borderRadius: "10px",
              overflowY: "scroll",
            }}
            p={3}
            bgcolor={"#E8E8E8"}
          >
            {loading ? <></> : <Chat messages={messages} />}
            <FormControl onKeyDown={sendMessage}>
              <TextField
                label="Enter a Message"
                size="small"
                onChange={(e) => setNewMessage(e.target.value)}
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
