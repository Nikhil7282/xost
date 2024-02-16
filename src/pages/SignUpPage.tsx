import { useState } from "react";

export default function SignUpPage() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    pic: null,
  });

  const handleChange = (e: any): void => {
    if (e.target.name === "pic") {
      setUserDetails({ ...userDetails, pic: e.target.files[0] });
    }
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(userDetails);
  };
  return (
    <div className="login-container h-screen w-screen bg-[url('/darkForest.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center">
      <div className="w-full p-6 m-auto bg-black bg-opacity-25 rounded-md shadow-md lg:max-w-xl">
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
              className="block w-full px-4 py-2 mt-2 text-black-300 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              className="block w-full px-4 py-2 mt-2 text-black-300 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
      file:disabled:opacity-50 file:disabled:pointer-events-none"
            />
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
            href="#"
            className="font-medium text-gray-500 hover:underline hover:text-gray-300"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
