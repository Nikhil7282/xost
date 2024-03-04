import { useAuthChat } from "../hooks/contextHooks";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import UsersLoader from "./Loader/UsersLoader";
import { User } from "../context/AuthContext";
import { getLocalStorage } from "../hooks/storageHooks";
import toast from "react-hot-toast";
import AddGroupModel from "./Models/AddGroupModel";

function MyChat() {
  const chat = useAuthChat();

  const getSender = (users: User[]): any => {
    let loggedUser = getLocalStorage("userInfo");
    if (!loggedUser) {
      toast.error("User not Logged In");
    }
    return users.find((user) => user._id !== loggedUser.id)?.name;
  };

  return (
    <Box
      display={{ xs: chat?.selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={0}
      bgcolor="#f8f8f8"
      width={{ xs: "100%", md: "31%" }}
      borderRadius="0px"
      border={1}
    >
      <Box
        p={2}
        fontSize={{ xs: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">My Chats</Typography>
        <AddGroupModel>New Group</AddGroupModel>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={0}
        
        bgcolor="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="lg"
        sx={{ overflow: "scroll" }}
      >
        {chat?.chats ? (
          <Stack>
            {chat?.chats?.map((ch) => (
              <Box
                component={Stack}
                flexDirection="row"
justifyContent="start"
                alignItems="center"
                gap={2}
                onClick={() => chat?.setSelectedChat(ch)}
                key={ch._id}
                sx={{ cursor: "pointer", borderRadius: "5px",  }}
                px={3}
                py={2}
                m={"3px"}
                bgcolor={chat?.selectedChat === ch ? "#38B2AC" : "#E8E8E8"}
                color={chat?.selectedChat === ch ? "white" : "black"}
              >
            <Avatar  />

                <Typography>
                  {!ch.isGroupChat ? getSender(ch.users) : ch.chatName}
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
