import axios from "axios";
import { useState } from "react";
import axiosClient from "../axios/axiosClient";
import { useNavigate } from "react-router-dom";
import { Boxes } from "../animations/Boxes";
import { CircularProgress } from "@mui/material";

type UserDetails = {
  name: string;
  email: string;
  password: string;
  pic: File | null;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    password: "",
    pic: null,
  });
  const [loading, setLoading] = useState<true | false>(false);

  const imageUpload = async (image: any) => {
    setLoading(true);
    if (image === undefined) {
      setLoading(false);
      console.log("loading...");
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const uploadInstance = axios.create();

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "xost-chat-app");
      formData.append("cloud_name", "dhpnudwl9");
      const res = await uploadInstance.post(
        `https://api.cloudinary.com/v1_1/dhpnudwl9/image/upload`,
        formData
      );
      // console.log(res);
      setUserDetails({ ...userDetails, pic: res.data.url });
      setLoading(false);
    } else {
      console.log("select a image");
      setLoading(false);
    }
    setLoading(false);
  };

  const handleChange = async (e: any): Promise<void> => {
    if (e.target.name === "pic") {
      imageUpload(e.target.files[0]);
      return;
    }
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/user/signup", userDetails);
      navigate("/login");
      return console.log(res);
    } catch (error: any) {
      if (error.response.status === 401) {
        return console.log("user already exists");
      }
      console.log(error);
    }
  };
  return (
    <div className="absolute flex flex-col items-center justify-center w-full h-full gap-8 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="w-full p-6 m-auto z-20 bg-black bg-opacity-25 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-300 underline">
          Sign Up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-300"
            >
              Name
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="name"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black-300 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300"
            >
              Email
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-black-300 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-300"
            >
              Password
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black-700 border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-300"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="confirmPassword"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black-300  border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="pic"
              className="block text-sm font-semibold text-gray-300"
            >
              Image
            </label>
            <input
              name="pic"
              onChange={(e) => handleChange(e)}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 mt-2
      file:me-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-600 file:text-white
      hover:file:bg-gray-800 
      hover:cursor-pointer
      file:disabled:opacity-50 file:disabled:pointer-events-none"
            />
            {loading && (
              <CircularProgress size="30px" sx={{ marginTop: "5px" }} />
            )}
          </div>
          <div className="mt-6">
            <button
              onClick={(e) => handleSubmit(e)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-semibold text-center text-gray-300 ">
          {" "}
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-gray-500 hover:underline hover:text-gray-300"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
