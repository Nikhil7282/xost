import { useState } from "react";
import axiosClient from "../axios/axiosClient";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/contextHooks";
import { Box, Button, TextField, Typography } from "@mui/material";

type userDetails = {
  name: string;
  password: string;
};

export default function LoginPage() {
  const auth = useAuthUser();
  const [userDetails, setUserDetails] = useState<userDetails>({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e: any): Promise<void> => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    // console.log(userDetails);

    try {
      const res = await axiosClient.post("/user/login", userDetails);
      toast.success(res.data.message);
      navigate("/chats");
      auth?.login(res.data.user, res.data.token);
      // console.log(res);
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        return console.log(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: "url('/darkForest.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 6,
          bgcolor: "rgba(0, 0, 0, 0.25)",
          borderRadius: "12px",
          boxShadow: 1,
          maxWidth: "36rem",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          color="white"
        >
          Login
        </Typography>
        <Box component="form" mt={6} noValidate autoComplete="off">
          <Box mb={2}>
            <TextField
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              id="name"
              name="name"
              label="Name"
              type="email"
              fullWidth
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              name="password"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <a href="#" color="grey.600">
            Forget Password?
          </a>
          <Box mt={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </Box>
        <Typography
          variant="body2"
          component="p"
          mt={8}
          textAlign="center"
          color="grey.300"
        >
          Don't have an account? <a href="/signup">Sign up</a>
        </Typography>
      </Box>
    </Box>
  );
}
