import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useAuthChat } from "../hooks/contextHooks";
import { axiosAccessChats } from "../axios/axiosClient";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const UserListItem = ({ user }: any) => {
  const chat = useAuthChat();
  const [loading, setLoading] = useState(false);
  // console.log(chat);

  const accessChat = async () => {
    try {
      setLoading(true);
      const res = await axiosAccessChats(user._id);
      console.log(res);
      let isExists = chat?.chats?.find((ch) => ch._id === res.chat[0]._id);
      if (!isExists) {
        chat?.setChats(res.chat[0]);
        console.log(chat);
      }
      setLoading(false);
      // console.log(find ? true : false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        onClick={accessChat}
        sx={{
          height: "70px",
          cursor: "pointer",
          backgroundColor: "#E8E8E8",
          "&:hover": {
            backgroundColor: "#38B2AC",
            color: "white",
          },
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "black",
          px: 3,
          py: 2,
          mb: 2,
          borderRadius: "12px",
        }}
      >
        <Avatar
          sx={{ mr: 2, cursor: "pointer" }}
          alt={user?.name}
          src={user?.pic || ""}
        />
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="inherit" size={30} />
          </Box>
        ) : (
          <Box>
            <Typography variant="body1">{user.name}</Typography>
            <Typography variant="caption">
              <b>Email : </b>
              {user?.email}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default UserListItem;
