import { useState } from "react";
import axiosClient from "../axios/axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/contextHooks";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Boxes } from "../animations/Boxes";
import { loginValidation } from "../utils/validation";

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
      const isValidate = await loginValidation.validate(userDetails, {
        abortEarly: false,
      });
      // console.log(isValidate);
      const res = await axiosClient.post("/user/login", isValidate);
      toast.success(res.data.message);
      console.log(res);
      navigate("/chats");
      auth?.login(res.data.user, res.data.token);
    } catch (error: any) {
      if (error.inner) {
        toast.error(error.inner[0].errors);
        return;
      }
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
        return console.log(error.response.data.message);
      }
      console.log(error.inner[0].errors);
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
      <div className="absolute flex flex-col items-center justify-center w-full h-full gap-8 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <Box
          sx={{
            width: "100%",
            p: 6,
            bgcolor: "rgba(0, 0, 0, 0.25)",
            borderRadius: "12px",
            boxShadow: 1,
            maxWidth: "36rem",
            zIndex: 9999,
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
      </div>
    </Box>
  );
}
