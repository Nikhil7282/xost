import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { User } from "../context/AuthContext";

type Prop = {
  user: User;
  handleFunction: (user: User) => void;
};

const UserListItem = ({ user, handleFunction }: Prop) => {
  const [loading, setLoading] = useState(false);
  // console.log(handleFunction);

  const functionCall = async () => {
    setLoading(true);
    handleFunction(user);
    setLoading(false);
  };

  return (
    <div>
      <Box
        onClick={functionCall}
        sx={{
          height: "70px",
          cursor: "pointer",
          // backgroundColor: "#E8E8E8",
          borderBottom:"1px solid #E8E8E8",
          "&:hover": {
            backgroundColor: "#E8E8E8",
            color: "white",
          },
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "black",
          px: 3,
          py: 2,
          mb: 2,
          // borderRadius: "12px",
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
            <Typography variant="caption" sx={{color:"gray"}}>
              {/* <b>Email : </b> */}
              {user?.email}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default UserListItem;
