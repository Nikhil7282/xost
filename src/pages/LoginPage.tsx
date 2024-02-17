import { useState } from "react";
import axiosClient from "../axios/axiosClient";

type userDetails = {
  name: string;
  password: string;
};

export default function LoginPage() {
  const [userDetails, setUserDetails] = useState<userDetails>({
    name: "",
    password: "",
  });
  const handleChange = async (e: any): Promise<void> => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    console.log(userDetails);

    try {
      const res = await axiosClient.post("/user/login", userDetails);
      console.log(res);
    } catch (error: any) {
      if (error.response.status === 401) {
        return console.log(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="login-container h-screen w-screen bg-[url('/darkForest.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center">
      <div className="w-full p-6 m-auto bg-black bg-opacity-25 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-300 underline">
          Login
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
              onChange={(e) => {
                handleChange(e);
              }}
              name="name"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-black-300 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              onChange={(e) => {
                handleChange(e);
              }}
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-gray-300"
          >
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-semibold text-center text-gray-300 ">
          {" "}
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-gray-500 hover:underline hover:text-gray-300"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
