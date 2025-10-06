import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { SERVER_URL } from "../../Contant.js";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { Button } from "../ui/Button.jsx";
import { Input } from "../ui/Input.jsx";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/handleApiError.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignUp() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roles = [
    { key: "user", label: "user" },
    { key: "owner", label: "owner" },
    { key: "delivery_boy", label: "delivery_boy" },
  ];

  const handleSignup = async () => {
    try {
      setLoading(true);

      const result = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        { fullName, email, mobile, password, role: selectedRole },
        { withCredentials: true }
      );
      dispatch(setUserData(result?.data));
      toast.success(result.data.message || "Signup successful!");
    } catch (error) {
      handleApiError(error, "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile || !selectedRole) {
      return toast.error("Please enter mobile number and select role");
    }

    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${SERVER_URL}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          mobile,
          role: selectedRole,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(response.data));

      if (response.data?.success) {
        toast.success(response.data.message || "Google signup successful!");
        navigate("/dashboard");
      } else {
        toast.error(response.data?.message || "Google signup failed");
      }
    } catch (error) {
      handleApiError(error, "Google signup failed");
    } finally {
      setLoading(false);
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
        <Input
          label="Full Name"
          placeholder="Enter your Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Email */}
        <Input
          label="Email"
          placeholder="Enter your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Mobile */}
        <Input
          label="Mobile"
          placeholder="Enter your Mobile Number"
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Password */}
        <Input
          label="Password"
          placeholder="Enter your Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>

          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <Button
                key={role.key}
                text={role.label}
                variant={selectedRole === role.key ? "primary" : "secondary"}
                fullWidth
                size="md"
                onClick={() => setSelectedRole(role.key)}
              />
            ))}
          </div>
        </div>

        {/* Sign Up Button */}
        <Button
          variant={"primary"}
          size={"md"}
          text={"Sign up"}
          onClick={handleSignup}
          extraStyle={"justify-center w-full"}
          loading={loading}
        />

        {/* Google Sign Up */}
        <button
          className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-50 transition cursor-pointer"
          onClick={handleGoogleAuth}
        >
          <FcGoogle />
          Sign up with Google
        </button>

        {/* Sign In */}
        <div className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-[#ff4d30] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
