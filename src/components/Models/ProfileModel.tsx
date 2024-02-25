import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { User } from "../../context/AuthContext";

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

type Props = {
  children?: any;
  user: User | null | undefined;
};

function ProfileModel({ children, user }: Props) {
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
                <Typography
                  id="transition-modal-title"
                  variant="h4"
                  component="h2"
                >
                  {user?.name}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <img src={user?.pic} alt={user?.name} width="150px" />
                </Typography>
                <Typography mt={3} mb={3}>
                  {user?.email}
                </Typography>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      ) : (
        <Button onClick={() => setOpen(true)}>
          {children ? <span>{children}</span> : <VisibilityIcon />}
        </Button>
      )}
    </>
  );
}

export default ProfileModel;
