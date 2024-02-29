import ScrollableFeed from "react-scrollable-feed";
import { Message } from "./SingleChat";
import { useAuthUser } from "../hooks/contextHooks";
import { Box } from "@mui/material";

type Prop = {
  messages: Message[];
};

function Chat({ messages }: Prop) {
  const auth = useAuthUser();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        height: "100%",
        border: "1px solid black",
      }}
    >
      <ScrollableFeed>
        {messages &&
          messages.map((m: Message) => (
            <div key={m._id}>
              <span
                style={{
                  backgroundColor: `${
                    //@ts-ignore
                    m.sender === auth?.user?.id ? "#B9F5D0" : "grey"
                  }`,
                  borderRadius: "10px",
                  padding: "5px 10px",
                  maxWidth: "70%",
                  //@ts-ignore
                  marginLeft: `${m.sender === auth?.user?.id ? "33px" : "0"}`,
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </ScrollableFeed>
    </Box>
  );
}

export default Chat;
