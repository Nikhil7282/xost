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
        padding: "0 2rem",
        msOverflowStyle: "scroll",
      }}
    >
      <ScrollableFeed className="scrollable">
        {messages &&
          messages.map((m: Message) => (
            <div key={m._id} className="messageItem">
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === auth?.user?._id ? "#B9F5D0" : "#beb9b9"
                  }`,
                  color: `${
                    m.sender._id === auth?.user?._id ? "#000000" : "#ffffff"
                  }`,
                  float: `${
                    m.sender._id === auth?.user?._id ? "right" : "left"
                  }`,
                  borderRadius: "10px",
                  padding: "5px 10px",
                  maxWidth: "70%",

                  marginLeft: `${
                    m.sender._id === auth?.user?._id ? "303px" : "0"
                  }`,
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
