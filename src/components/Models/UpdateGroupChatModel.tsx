import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuthChat } from "../../hooks/contextHooks";
import { useState } from "react";
import UserBadge from "../UserBadge";
import { User } from "../../context/AuthContext";
import { FormControl, TextField } from "@mui/material";

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

const handleRemoveUser = (user: User) => {};
const handleRename = () => {};
const handleUserSearch = () => {};
export default function UpdateGroupChatModel() {
  const chat = useAuthChat();
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
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
                onClick={handleRename}
              >
                Rename
              </Button>
            </Box>
            <Box sx={{ margin: "15px" }}>
              <TextField
                label="Add User"
                onChange={handleUserSearch}
                size="small"
              />
            </Box>
            <Box>List of Users</Box>
            <Box>
              <Button>Leave</Button>
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
