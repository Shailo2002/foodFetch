import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { SERVER_URL } from "../../Contant.js";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result);
      // navigate("/dashboard"); // after successful login
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fff7f4]">
      <div className="bg-white shadow-md rounded-xl px-8 py-10 w-[380px]">
        {/* Header */}
        <h1 className="text-2xl font-extrabold text-[#ff4d30] mb-1">FoodFetch</h1>
        <p className="text-gray-600 text-sm mb-6">
          Sign In to your account to get started with delicious food deliveries
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-4">
          <span className="text-sm text-[#ff4d30] font-medium cursor-pointer hover:underline" onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </span>
        </div>

        {/* Sign In Button */}
        <button
          className="w-full bg-[#ff4d30] text-white font-semibold rounded-md py-2 hover:bg-[#e04329] transition mb-3 cursor-pointer"
          onClick={handleSignIn}
        >
          Sign In
        </button>

        {/* Google Sign In */}
        <button className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-50 transition cursor-pointer">
          <FcGoogle className="text-xl" />
          Sign In with Google
        </button>

        {/* Sign Up link */}
        <div className="text-center text-sm mt-4 text-gray-600">
          Want to create a new account?{" "}
          <span
            className="text-[#ff4d30] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
