import {
  Box,
  Button,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useAuthChat, useAuthUser } from "../hooks/contextHooks";
import ProfileModel from "./Models/ProfileModel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UsersLoader from "./Loader/UsersLoader";
import UserListItem from "./UserListItem";
import { axiosAccessChats, axiosSearchUsers } from "../axios/axiosClient";
import { User } from "../context/AuthContext";

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

const arr = [
  {
    _id: "65d4aefa673f13bf2d65d366",
    name: "Subash",
    password: "$2a$10$sKb.y/Fw1q4GZQLfa.jKhu8e0d.rSftHUZknzA.EKr2vcFW1Gjb46",
    email: "subashkrishna000@gmail.com",
    pic: null,
    createdAt: "2024-02-20T13:54:02.320Z",
    updatedAt: "2024-02-20T13:54:02.320Z",
    __v: 0,
  },
  {
    _id: "65d4af26673f13bf2d65d36d",
    name: "Raksath",
    password: "$2a$10$sKb.y/Fw1q4GZQLfa.jKhu8e0d.rSftHUZknzA.EKr2vcFW1Gjb46",
    email: "raksath7@gmail.com",
    pic: "http://res.cloudinary.com/dhpnudwl9/image/upload/v1708437248/zoxmxsi6pwaaesfaorr6.jpg",
    createdAt: "2024-02-20T13:54:46.128Z",
    updatedAt: "2024-02-20T13:54:46.128Z",
    __v: 0,
  },
  {
    _id: "65d4af6a673f13bf2d65d372",
    name: "Arshath",
    password: "$2a$10$sKb.y/Fw1q4GZQLfa.jKhu8e0d.rSftHUZknzA.EKr2vcFW1Gjb46",
    email: "arshath@gmail.com",
    pic: "http://res.cloudinary.com/dhpnudwl9/image/upload/v1708437248/zoxmxsi6pwaaesfaorr6.jpg",
    createdAt: "2024-02-20T13:55:54.106Z",
    updatedAt: "2024-02-20T13:55:54.106Z",
    __v: 0,
  },
  {
    _id: "65d4af92673f13bf2d65d375",
    name: "krishna",
    password: "$2a$10$sKb.y/Fw1q4GZQLfa.jKhu8e0d.rSftHUZknzA.EKr2vcFW1Gjb46",
    email: "krishna@gmail.com",
    pic: "http://res.cloudinary.com/dhpnudwl9/image/upload/v1708437248/zoxmxsi6pwaaesfaorr6.jpg",
    createdAt: "2024-02-20T13:56:34.527Z",
    updatedAt: "2024-02-20T13:56:34.527Z",
    __v: 0,
  },
];

function SideDrawer() {
  const auth = useAuthUser();
  const chat = useAuthChat();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(arr);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  //drawer state
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (opt: boolean) => {
    setOpenDrawer(opt);
  };

  //mui menu state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
  };

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
      // console.log(res);
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
      console.log(res);
      let isExists = chat?.chats?.find((ch) => ch._id === res.chat[0]._id);
      if (!isExists) {
        chat?.setChats(res.chat[0]);
        console.log(chat);
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
        sx={{background:"#f8f8f8"}}
      >
        <Tooltip title="Search Users to chat" arrow placement="bottom-end">
          <div style={{border:'1px #f1f1f1 solid', borderRadius:'1rem', background:"#4E4CC4",color:"white", height:'100%', display:"flex", alignItems:"center", cursor:"pointer", padding:"0 1rem"}} onClick={() => toggleDrawer(!openDrawer)}>
            <i className="fas fa-search"></i>
            <Typography display={{ xs: "none", md: "block" }} color="white" paddingLeft={2}>
              Search User
            </Typography>
          </div>
        </Tooltip>
        <Typography fontSize="2xl" fontFamily="Work sans">
          Xost
        </Typography>
        <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
            <NotificationsIcon fontSize={"medium"} />
          <div
            id="profile"
            style={{cursor:"pointer"}}
            // variant="contained"
            onClick={handleMenuClick}
            // endIcon={
            //   <KeyboardArrowDownIcon
            //     fontSize={"medium"}
            //     aria-controls={open ? "true" : undefined}
            //     aria-haspopup="true"
            //     aria-expanded={open ? "true" : undefined}
            //   />
            // }
          >
            <Avatar alt={auth?.user?.name} src={auth?.user?.pic} sx={{cursor:"pointer"}} />
          </div>
          <Menu open={false}></Menu>
          <Menu
            open={open}
            id="profile"
            anchorEl={anchorEl}
            MenuListProps={{
              "aria-labelledby": "profile",
            }}
            onClose={handleMenuClose}
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
              <Typography borderBottom="1px solid">Search Users</Typography>
            </ListItem>
            <ListItem>
              <TextField
                label="Search Users"
                name="searchUsers"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ marginLeft: "5px" }}
                onClick={handleSearch}
              >
                Go
              </Button>
            </ListItem>
            {loading ? (
              <ListItem>
                <UsersLoader />
              </ListItem>
            ) : (
              searchResult?.map((user: any) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user)}
                />
              ))
            )}
          </List>
        </Box>
        {/* <DrawerBody>
          <Box display="flex" paddingBottom={2}>
            <Input
              placeholder="Search by name or email"
              marginRight={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner ml="auto" display="flex" />}
        </DrawerBody> */}
      </Drawer>
    </>
  );
}

export default SideDrawer;
