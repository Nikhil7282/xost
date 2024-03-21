import {
  Box,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  TextField,
  List,
  ListItem,
  Badge,
} from "@mui/material";
import { useAuthChat, useAuthUser } from "../hooks/contextHooks";
import ProfileModel from "./Models/ProfileModel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UsersLoader from "./Loader/UsersLoader";
import UserListItem from "./UserListItem";
import { axiosAccessChats, axiosSearchUsers } from "../axios/axiosClient";
import { User } from "../context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import NotificationModel from "./Models/NotificationModel";
import { useState } from "react";

export type SearchUser = {
  _id: string;
  name: string;
  password: string;
  email: string;
  pic: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v: number | null;
};

function SideDrawer() {
  const auth = useAuthUser();
  const chat = useAuthChat();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  //drawer state
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (opt: boolean) => {
    setOpenDrawer(opt);
  };

  //mui menu state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  //logout
  const handleLogout = () => {
    auth?.logout();
    navigate("/");
  };

  //search users
  const handleSearch = async () => {
    if (!search) {
      toast("Please Enter Something", {
        icon: "⚠️",
      });
      return;
    }
    try {
      setLoading(true);
      let res = await axiosSearchUsers(search);
      setSearchResult(res);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
      return;
    }
  };

  //access users
  const accessChat = async (user: User) => {
    try {
      const res = await axiosAccessChats(user._id || "");
      if (chat?.chats === null) {
        chat?.setChats([]);
      }
      let isExists = chat?.chats?.find((ch) => ch._id === res.chat._id);
      if (!isExists) {
        chat?.setChats([...(chat?.chats || []), res.chat]);
        setOpenDrawer(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="white"
        width="100%"
        padding="5px 1rem"
        height="60px"
        sx={{ background: "#f8f8f8" }}
      >
        <Tooltip title="Search Users to chat" arrow placement="bottom-end">
          <div
            style={{
              border: "1px #f1f1f1 solid",
              borderRadius: "1rem",
              background: "#4E4CC4",
              color: "white",
              height: "100%",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "0 1rem",
            }}
            onClick={() => toggleDrawer(!openDrawer)}
          >
            <SearchIcon />
            <Typography
              display={{ xs: "none", md: "block" }}
              color="white"
              paddingLeft={2}
            >
              Search User
            </Typography>
          </div>
        </Tooltip>
        <Typography fontSize="2xl" fontFamily="Work sans">
          Xost
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div>
            <Badge badgeContent={chat?.notification.length} color="primary">
              <NotificationModel />
            </Badge>
          </div>
          <div
            id="profile"
            style={{ cursor: "pointer" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar
              alt={auth?.user?.name}
              src={auth?.user?.pic}
              sx={{ cursor: "pointer" }}
            />
          </div>
          <Menu
            open={open}
            id="profile"
            anchorEl={anchorEl}
            MenuListProps={{
              "aria-labelledby": "profile",
            }}
            onClose={() => setAnchorEl(null)}
          >
            <ProfileModel user={auth?.user}>Profile</ProfileModel>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Box>
      <Drawer
        anchor="left"
        onClose={() => toggleDrawer(!openDrawer)}
        open={openDrawer}
      >
        <Box>
          <List>
            <ListItem>
              <TextField
                label="Search Users"
                name="searchUsers"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="ml-2"
                style={{ background: "#4E4CC4" }}
              >
                <SearchIcon sx={{ color: "white" }} />
              </button>
            </ListItem>
            {loading ? (
              <ListItem>
                <UsersLoader />
              </ListItem>
            ) : searchResult.length > 0 ? (
              searchResult?.map((user: any) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user)}
                />
              ))
            ) : (
              <div style={{ marginLeft: "10px" }}>No Users Found</div>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default SideDrawer;
