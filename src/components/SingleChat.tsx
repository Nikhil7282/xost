import { Box, Button, Typography } from "@mui/material";
import { useAuthChat, useAuthUser } from "../hooks/contextHooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetSender, useGetSenderObject } from "../hooks/senderHooks";
import ProfileModel from "./Models/ProfileModel";
import UpdateGroupChatModel from "./Models/UpdateGroupChatModel";
function SingleChat() {
  const auth = useAuthUser();
  const chat = useAuthChat();

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
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              overflowY: "hidden",
            }}
            p={3}
            bgcolor={"#E8E8E8"}
          ></Box>
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
