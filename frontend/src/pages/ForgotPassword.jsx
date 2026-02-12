import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";
import { SERVER_URL } from "../../Contant";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email");

    try {
      setLoading(true);
      const result = await axios.post(
        `${SERVER_URL}/api/auth/send-otp`,
        { email },
        { withCredentials: true },
      );

      if (result.data?.success) {
        toast.success(result.data.message || "OTP sent successfully");
        setStep(2);
      } else {
        toast.error(result.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      handleApiError(error, "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Please enter the OTP");

    try {
      setLoading(true);
      const result = await axios.post(
        `${SERVER_URL}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );

      if (result.data?.success) {
        toast.success(result.data.message || "OTP verified successfully");
        setStep(3);
      } else {
        toast.error(result.data?.message || "OTP verification failed");
      }
    } catch (error) {
      handleApiError(error, "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newpassword || !confirmpassword)
      return toast.error("Please fill in all password fields");
    if (newpassword !== confirmpassword)
      return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const result = await axios.post(
        `${SERVER_URL}/api/auth/reset-password`,
        { newPassword: newpassword, email },
        { withCredentials: true },
      );

      if (result.data?.success) {
        toast.success(result.data.message || "Password reset successfully");
        navigate("/signin");
      } else {
        toast.error(result.data?.message || "Password reset failed");
      }
    } catch (error) {
      handleApiError(error, "Password reset failed");
    } finally {
      setLoading(false);
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

        {step === 1 && (
          <>
            <div className="mt-4">
              <Input
                label="Email"
                placeholder="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                extraStyle="mt-4"
              />
            </div>

            <Button
              text="Send OTP"
              onClick={handleSendOtp}
              fullWidth
              loading={loading}
            />
          </>
        )}

        {step === 2 && (
          <>
            <div className="mt-4">
              <Input
                label="Enter OTP"
                placeholder="Enter your OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <Button
              text="Verify"
              onClick={handleVerifyOtp}
              fullWidth
              loading={loading}
            />
          </>
        )}

        {step === 3 && (
          <>
            <div className="mt-4">
              <Input
                label="New Password"
                placeholder="Enter your New Password"
                type="password"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                placeholder="Re-enter your New Password"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>

            <Button
              text="Reset Password"
              onClick={handleResetPassword}
              fullWidth
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
}
