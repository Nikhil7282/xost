import {
  Typography,
  Stack,
  Menu,
  Tooltip,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuthChat } from "../../hooks/contextHooks";

function NotificationModel() {
  const chat = useAuthChat();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    chat?.setNotification(
      chat.notification.filter((nft) => {
        return nft.chatId._id != chat.selectedChat?._id;
      })
    );
  }, [chat?.selectedChat]);

  const redirectChat = (chatId: any, notId: string) => {
    setOpen(false);
    chat?.setNotification(chat.notification.filter((not) => not._id !== notId));
    chat?.setSelectedChat(chatId);
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Notification">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            width: "300px",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0,
            pt: 0,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography>
          {chat?.notification.length == 0 ? (
            <Typography>No Notifications Yet</Typography>
          ) : (
            <Stack>
              {chat?.notification?.map((not) => (
                <MenuItem
                  sx={{ cursor: "pointer", borderTop: "1px solid #e8e8e8" }}
                  key={not._id}
                  onClick={() => redirectChat(not.chatId, not._id)}
                >
                  <Stack>
                    <Typography>
                      {not.chatId.isGroupChat
                        ? not.chatId.chatName
                        : not.sender.name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.6rem", color: "gray" }}>
                      {not.content}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          )}
        </Typography>
      </Menu>
    </>
  );
}

export default NotificationModel;
