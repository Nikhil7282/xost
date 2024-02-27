import { Box } from "@mui/material";
import { useAuthChat } from "../hooks/contextHooks";
import SingleChat from "./SingleChat";

function ChatBox() {
  const chat = useAuthChat();
  return (
    <Box
      display={{ xs: chat?.selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      padding={3}
      bgcolor="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
    >
      <SingleChat />
    </Box>
  );
}

export default ChatBox;
