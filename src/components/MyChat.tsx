import { useState } from "react";
import { useAuthChat } from "../hooks/contextHooks";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UsersLoader from "./Loader/UsersLoader";
import { Chat } from "../context/ChatContext";
import { User } from "../context/AuthContext";
import { getLocalStorage } from "../hooks/storageHooks";
import toast from "react-hot-toast";

function MyChat() {
  const chat = useAuthChat();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const getSender = (users: User[]): any => {
    let loggedUser = JSON.parse(getLocalStorage("userInfo") || '"');
    if (!loggedUser) {
      toast.error("User not Logged In");
    }
    return users.find((user) => user._id !== loggedUser.id)?.name;
  };

  return (
    <Box
      display={{ xs: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bgcolor="white"
      width={{ xs: "100%", md: "31%" }}
      borderRadius="10px"
      border={1}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ xs: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">My Chats</Typography>
        <Button
          // fontSize={{ xs: "17px", md: "10px", lg: "17px" }}
          endIcon={<AddIcon />}
        >
          New Group Chat
        </Button>

        {/* <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ xs: "17px", md: "10px", lg: "17px" }}
            endIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal> */}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bgcolor="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="lg"
        // overflowY="hidden"
      >
        {chat?.chats ? (
          <Stack>
            {chat.chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
                sx={{ cursor: "pointer", borderRadius: "5px" }}
                px={3}
                py={2}
                m={"3px"}
                bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
              >
                <Typography>
                  {!chat.isGroupChat ? getSender(chat.users) : chat.chatName}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <UsersLoader />
        )}
      </Box>
    </Box>
  );
}

export default MyChat;
