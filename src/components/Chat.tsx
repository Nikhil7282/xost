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
      className="chattingBox"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        height: "calc(100% - 70px)",
        // border: "1px solid black",
        padding:"0 2rem"
      }}
    >
      <ScrollableFeed className="scrollable">
        {messages &&
          messages.map((m: Message) => (
            <div key={m._id} className="messageItem">
              <span 
                style={{
                  backgroundColor: `${
                    //@ts-ignore
                    m.sender === auth?.user?.id ? "#B9F5D0" : "#f1f1f1"

                    }`,
                  float: `${
                    //@ts-ignore
                    m.sender === auth?.user?.id ? "right" : "left"
                    }`,
                  borderRadius: "10px",
                  padding: "5px 10px",
                  maxWidth: "70%",
                  
                  //@ts-ignore
                  marginLeft: `${m.sender === auth?.user?.id ? "303px" : "0"}`,
                  // margin:"1rem"
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
