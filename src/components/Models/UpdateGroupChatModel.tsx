import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuthChat, useAuthUser } from "../../hooks/contextHooks";
import { useEffect, useState } from "react";
import UserBadge from "../UserBadge";
import { User } from "../../context/AuthContext";
import { CircularProgress, TextField } from "@mui/material";
import toast from "react-hot-toast";
import {
  axiosAddToGroup,
  axiosDeleteFromGroup,
  axiosDeleteGroup,
  axiosGroupName,
  axiosSearchUsers,
} from "../../axios/axiosClient";
import UserListItem from "../UserListItem";
import { getLocalStorage } from "../../hooks/storageHooks";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export default function UpdateGroupChatModel() {
  const chat = useAuthChat();
  const auth = useAuthUser();
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  console.log(chat?.selectedChat);

  useEffect(() => {
    const getUsers = setTimeout(async () => {
      if (!search) return;
      setLoading(true);
      const res = await axiosSearchUsers(search);
      setSearchResult(res);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(getUsers);
  }, [search]);

  const handleRemoveUser = async (user: User | null | undefined) => {
    if (user === null || user === undefined) {
      toast("Invalid User", {
        icon: "⚠️",
      });
      return;
    }
    if (!chat?.selectedChat?.users.find((u) => u._id === user._id)) {
      toast("User Does Not Exists", {
        icon: "⚠️",
      });
    }
    try {
      setLoading(true);
      const res = await axiosDeleteFromGroup(
        chat?.selectedChat?._id || "",
        user._id || ""
      );
      setLoading(false);
      toast.success(res.message);
      if (user._id === auth?.user?._id) {
        chat?.setChats(
          chat?.chats?.filter((ch) => ch._id !== chat?.selectedChat?._id) || []
        );
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleAddUser = async (user: User) => {
    if (chat?.selectedChat?.users.find((u) => u._id === user._id)) {
      toast.error("User already in group");
      return;
    }
    try {
      setLoading(true);
      let res = await axiosAddToGroup(
        chat?.selectedChat?._id || "",
        user._id || ""
      );
      setLoading(false);
      toast.success(res.message);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleGroupRename = async () => {
    if (!groupChatName) {
      toast("Enter Group Name", {
        icon: "⚠️",
      });
      return;
    }
    try {
      setRenameLoading(true);
      const res = await axiosGroupName(
        chat?.selectedChat?._id || "",
        groupChatName
      );
      toast.success(res.message);
      setRenameLoading(false);
      if (chat?.selectedChat) {
        chat?.setSelectedChat({
          ...chat.selectedChat,
          chatName: groupChatName,
        });
      }
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleDeleteGroup = async (chatId: string | undefined) => {
    if (chatId == undefined) {
      return;
    }
    try {
      const res = await axiosDeleteGroup(chatId);
      // console.log(res);
      chat?.setChats(chat?.chats?.filter((ch) => ch._id !== chatId));
      toast.success(res.message);
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <SettingsIcon />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              {chat?.selectedChat?.chatName.toUpperCase()}
            </Typography>
            <Box
              sx={{
                mt: "5px",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {chat?.selectedChat?.users.map((user) => {
                return (
                  <UserBadge
                    key={user._id}
                    user={user}
                    handleFunction={() => handleRemoveUser(user)}
                  />
                );
              })}
            </Box>
            <Box sx={{ width: "80%", display: "flex" }}>
              <TextField
                size="small"
                label="Rename"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ marginLeft: "3px", width: "30%" }}
                onClick={handleGroupRename}
              >
                {renameLoading ? (
                  <>
                    <CircularProgress color="inherit" />
                  </>
                ) : (
                  "Rename"
                )}
              </Button>
            </Box>
            {chat?.selectedChat?.groupAdmin._id ===
            getLocalStorage("userInfo")._id ? (
              <>
                <Box sx={{ margin: "15px" }}>
                  <TextField
                    label="Add User"
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                  />
                </Box>
                <Box>
                  {searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))}
                </Box>
              </>
            ) : (
              <></>
            )}
            <Box>
              {auth?.user?._id == chat?.selectedChat?.groupAdmin._id && (
                <Button
                  onClick={() => handleDeleteGroup(chat?.selectedChat?._id)}
                >
                  Delete
                </Button>
              )}
              {auth?.user?._id == chat?.selectedChat?.groupAdmin._id ? (
                <></>
              ) : (
                <Button onClick={() => handleRemoveUser(auth?.user)}>
                  Leave
                </Button>
              )}
              <Button variant="contained" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
