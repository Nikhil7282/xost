import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { User } from "../../context/AuthContext";
import { useAuthChat } from "../../hooks/contextHooks";
import { TextField } from "@mui/material";
import { axiosSearchUsers } from "../../axios/axiosClient";
import { CircularProgress } from "@mui/material";
import UserListItem from "../UserListItem";
import toast from "react-hot-toast";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

type Props = {
  children?: any;
};

export default function AddGroupModel({ children }: Props) {
  const chat = useAuthChat();

  const [groupName, setGroupName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<User[] | null>(null);
  const [searchUsers, setSearchUsers] = useState("");
  const [searchResults, setSearchResults] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = setTimeout(async () => {
      if (!searchUsers) {
        return;
      }
      setLoading(true);
      const res = await axiosSearchUsers(searchUsers);
      // console.log(res);
      setSearchResults(res);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(getUsers);
  }, [searchUsers]);

  const handleGroup = async (userToAdd: User) => {
    if (selectedUsers?.includes(userToAdd)) {
      toast("User Already Added", {
        icon: "⚠️",
      });
      return;
    }
    if (selectedUsers != null) {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const createGroup = async () => {};

  //model state
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                mb={1}
              >
                Create Group Chat
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <TextField
                  value={groupName}
                  id="outlined-basic"
                  label="Group Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Add Users"
                  variant="outlined"
                  size="small"
                  onChange={(e) => setSearchUsers(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                mt={2}
              >
                {loading && <CircularProgress />}
                {searchResults?.slice(0, 3)?.map((user) => {
                  return <UserListItem key={user._id} user={user} />;
                })}
              </Box>
              <Box mt={2}>
                {" "}
                <Button variant="contained" onClick={createGroup}>
                  Create
                </Button>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      ) : (
        <Button endIcon={<AddIcon />} onClick={() => setOpen(true)}>
          {children}
        </Button>
      )}
    </>
  );
}
