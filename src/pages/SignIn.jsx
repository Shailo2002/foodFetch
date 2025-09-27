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

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      setLoading(true);
      const result = await axios.post(
        `${SERVER_URL}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      if (result.data?.success) {
        toast.success(result.data.message || "Login successful!");
        navigate("/");
      } else {
        toast.error(result.data?.message || "Login failed");
      }
    } catch (error) {
      handleApiError(error, "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${SERVER_URL}/api/auth/google-auth`,
        { fullName: result.user.displayName, email: result.user.email },
        { withCredentials: true }
      );

      if (response.data?.success) {
        toast.success(response.data.message || "Google login successful!");
        navigate("/");
      } else {
        toast.error(response.data?.message || "Google login failed");
      }
    } catch (error) {
      handleApiError(error, "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fff7f4]">
      <div className="bg-white shadow-md rounded-xl px-8 py-10 w-[380px]">
        <h1 className="text-2xl font-extrabold text-[#ff4d30] mb-1">
          FoodFetch
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Your favorite food is just a login away
        </p>

        <Input
          label="Email"
          placeholder="Enter your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          placeholder="Enter your Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end mb-4">
          <span
            className="text-sm text-[#ff4d30] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          text="Sign in"
          onClick={handleSignIn}
          extraStyle="justify-center w-full"
          loading={loading}
        />

        <button
          className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-50 transition cursor-pointer"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <FcGoogle className="text-xl" />
          Sign In with Google
        </button>

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
