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
import { AuthUser } from "../hooks/contextHooks";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UsersLoader from "./Loader/UsersLoader";
import UserListItem from "./UserListItem";

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
  const auth = AuthUser();
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
  const handleSearch = () => {
    if (!search) {
      toast("Please Enter Something", {
        icon: "⚠️",
      });
      return;
    }

    try {
      setLoading(true);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
      return;
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
        padding="5px 10px"
      >
        <Tooltip title="Search Users to chat" arrow placement="bottom-end">
          <Button variant="contained" onClick={() => toggleDrawer(!openDrawer)}>
            <i className="fas fa-search"></i>
            <Typography display={{ xs: "none", md: "block" }} paddingLeft={2}>
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography fontSize="2xl" fontFamily="Work sans">
          Xost
        </Typography>
        <div>
          <Button>
            <NotificationsIcon fontSize={"medium"} />
          </Button>
          <Button
            id="profile"
            variant="contained"
            onClick={handleMenuClick}
            endIcon={
              <KeyboardArrowDownIcon
                fontSize={"medium"}
                aria-controls={open ? "true" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            }
          >
            <Avatar
              // size="sm"
              // cursor="pointer"
              alt={auth?.user?.name}
              src={auth?.user?.pic}
            />
          </Button>
          <Menu open={false}>
            {/* <MenuList
            pl={2}
            >
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                // <MenuItem
                //   key={notif._id}
                //   onClick={() => {
                //     setSelectedChat(notif.chat);
                //     setNotification(notification.filter((n) => n !== notif));
                //   }}
                // >
                //   {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                //     : `New Message from ${getSender(user, notif.chat.users)}`}
                // </MenuItem>
              ))}
            </MenuList> */}
          </Menu>
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
              searchResult?.map((user: SearchUser) => (
                <UserListItem key={user._id} user={user} />
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