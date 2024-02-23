import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { SearchUser } from "./SideDrawer";

const UserListItem = (user: any) => {
  // console.log(user);
  return (
    <Box
      key={user._id}
      // onClick={handleFunction}
      sx={{
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
      <Box>
        <Typography variant="body1">{user.name}</Typography>
        <Typography variant="caption">
          <b>Email : </b>
          {user?.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
