import { useAuthChat } from "../hooks/contextHooks";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import UsersLoader from "./Loader/UsersLoader";
import AddGroupModel from "./Models/AddGroupModel";
import { getSender, getSenderObject } from "../hooks/senderHooks";

function MyChat() {
  const chat = useAuthChat();
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
        <Typography variant="h5">My Chats</Typography>
        <AddGroupModel>
          <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
            New Group
          </Typography>
        </AddGroupModel>
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
                sx={{ cursor: "pointer", borderRadius: "0px" }}
                px={2}
                py={2}
                // m={"3px"}
                borderTop="1px solid #E8E8E8"
                bgcolor={
                  chat.selectedChat?._id === ch._id ? "rgb(78, 76, 196)" : ""
                }
                color={
                  chat.selectedChat?._id === ch._id
                    ? "white !important"
                    : "white !important"
                }
              >
                {!ch.isGroupChat ? (
                  <Avatar src={getSenderObject(ch.users)?.pic} />
                ) : (
                  <Avatar src="https://res.cloudinary.com/dhpnudwl9/image/upload/jq0gutysth4mcoqcszxl.jpg" />
                )}
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
