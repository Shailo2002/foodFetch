import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import { SERVER_URL } from "../../Contant.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate()
  const roles = [
    { key: "user", label: "user" },
    { key: "owner", label: "owner" },
    { key: "deliveryBoy", label: "deliveryBoy" },
  ];

  const handleSignup = async () => {
    try {
      console.log(`${SERVER_URL}/api/auth/signup`);
      const result = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role: selectedRole,
        },
        { withCredentials: true }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fff7f4]">
      <div className="bg-white shadow-md rounded-xl px-8 py-10 w-[380px]">
        {/* Header */}
        <h1 className="text-2xl font-extrabold text-[#ff4d30] mb-1">
          FoodFetch
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Create your account to get started with delicious food deliveries
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>

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

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile
          </label>
          <input
            type="text"
            placeholder="Enter your Mobile Number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
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

        {/* Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <button
                key={role.key}
                onClick={() => setSelectedRole(role.key)}
                className={`w-full py-2 rounded-md text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  selectedRole === role.key
                    ? "bg-[#ff4d30] text-white border-[#ff4d30] hover:bg-[#e04329]"
                    : "border-gray-300 text-gray-600 hover:bg-[#ffe3dc]"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Button */}
        <button className="w-full bg-[#ff4d30] text-white font-semibold rounded-md py-2 hover:bg-[#e04329] transition mb-3 cursor-pointer" onClick={handleSignup}>
          Sign Up
        </button>

        {/* Google Sign Up */}
        <button className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-50 transition cursor-pointer">
          <FcGoogle />
          Sign up with Google
        </button>

        {/* Sign In */}
        <div className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span className="text-[#ff4d30] font-medium cursor-pointer hover:underline" onClick={() => navigate("/signin")}>
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
