import {
  Box,
  Button,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Drawer,
  MenuList,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { AuthUser } from "../hooks/contextHooks";
import ProfileModel from "./ProfileModel";

function SideDrawer() {
  const auth = AuthUser();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  //mui menu state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
  };

  //mui model state
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
          <Button
            variant="contained"
            // onClick={onOpen}
          >
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
            <ProfileModel>Profile</ProfileModel>
            <MenuItem>Logout</MenuItem>
            {/* <MenuButton
              as={Button}
              bg="white"
              rightIcon={<KeyboardArrowDownIcon />}
            >
              <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal
              user={user}
              >
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem
              onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList> */}
          </Menu>
        </div>
      </Box>

      {/* <Drawer
        anchor="left"
        onClose={onClose}
        open={isOpen}
      >
        <DrawerHeader borderBottom="1px solid">Search Users</DrawerHeader>
        <DrawerBody>
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
        </DrawerBody>
      </Drawer> */}
    </>
  );
}

export default SideDrawer;
