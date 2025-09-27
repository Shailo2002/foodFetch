import React from "react";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Contant";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (newpassword !== confirmpassword) {
        alert("both password is not same");
        return null;
      }
      const result = await axios.post(
        `${SERVER_URL}/api/auth/reset-password`,
        {
          newpassword, email
        },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#fff7f4]">
      <div className="bg-white shadow-md rounded-xl px-6 py-6 w-[380px]">
        <div className="text-xl font-bold text-[#ff4d30] mb-1 flex items-center gap-4">
          <IoIosArrowRoundBack
            onClick={() => navigate("/signin")}
            className="hover:bg-gray-200 transition cursor-pointer rounded"
          />
          Forgot Password
        </div>

        {/* step 1 */}
        {step == 1 && (
          <>
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button
              className="w-full bg-[#ff4d30] text-white font-semibold rounded-md py-1 hover:bg-[#e04329] transition mb-3 cursor-pointer"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        )}

        {/* step 2 */}
        {step == 2 && (
          <>
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter your OTP"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>

            <button
              className="w-full bg-[#ff4d30] text-white font-semibold rounded-md py-1 hover:bg-[#e04329] transition mb-3 cursor-pointer"
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
          </>
        )}

        {/* step 3 */}
        {step == 3 && (
          <>
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your New Password"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
                onChange={(e) => setNewpassword(e.target.value)}
                value={newpassword}
              />
            </div>

            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-Enter your New Password"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#ff4d30]"
                onChange={(e) => setConfirmpassword(e.target.value)}
                value={confirmpassword}
              />
            </div>

            <button
              className="w-full bg-[#ff4d30] text-white font-semibold rounded-md py-1 hover:bg-[#e04329] transition mb-3 cursor-pointer"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
