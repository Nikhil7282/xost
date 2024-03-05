import {
  Backdrop,
  Box,
  Button,
  Modal,
  Typography,
  Fade,
  Stack,
  styled,
  Paper,
} from "@mui/material";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuthChat } from "../../hooks/contextHooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function NotificationModel() {
  const chat = useAuthChat();
  console.log(chat?.notification);

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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>
                  {chat?.notification.length == 0 ? (
                    <Typography>No Notifications Yet</Typography>
                  ) : (
                    <Box>
                      {chat?.notification?.map((not) => (
                        <Stack>
                          <Box>
                            <Typography>
                              {not.chatId.chatName + "123"}
                            </Typography>
                            <Typography>{not.content}</Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Box>
                  )}
                </Typography>

                <Button variant="contained" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      ) : (
        <NotificationsIcon
          fontSize={"medium"}
          color="primary"
          onClick={() => setOpen(true)}
        />
      )}
    </>
  );
}

export default NotificationModel;
