import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { handleApiError } from "../utils/handleApiError";
import { SERVER_URL } from "../../Contant";
import { Button } from "../ui/Button";
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import { Input } from "../ui/Input";

export default function DeliveryBoyDahsboard() {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [loading, setLoading] = useState();
  const [otp, setOtp] = useState("");

  const handleGetAssignments = async () => {
    try {
      const result = await axios.get(
        `${SERVER_URL}/api/order/get-assignments`,
        { withCredentials: true }
      );
      console.log("get assignments ", result?.data);
      setAvailableAssignments(result?.data?.data);
    } catch (error) {
      handleApiError(error, "Order failed. Try again.");
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(
        `${SERVER_URL}/api/order/accept-order/${assignmentId}`,
        { withCredentials: true }
      );
      console.log("order accepted ", result?.data);
      getCurrentOrder();

      toast.success(result?.data?.message || "shop added successful!");
    } catch (error) {
      handleApiError(error, "Order failed. Try again.");
    }
  };

  const handleSendOtp = async () => {
    if (!currentOrder?.user?.email)
      return toast.error("Please enter your email");

    try {
      setLoading(true);
      const result = await axios.post(
        `${SERVER_URL}/api/auth/send-otp`,
        { email: currentOrder?.user?.email },
        { withCredentials: true }
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

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${SERVER_URL}/api/order/get-current-order`,
        { withCredentials: true }
      );
      console.log("get current Order ", result?.data?.data);
      setCurrentOrder(result?.data?.data);
      toast.success(result?.data?.message || "shop added successful!");
    } catch (error) {
      handleApiError(error, "Order failed. Try again.");
    }
  };

  useEffect(() => {
    handleGetAssignments();
    getCurrentOrder();
  }, [userData]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-orange-50">
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center gap-4 overflow-y-auto p-4">
        <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
          <div className="bg-white rounded-lg shadow p-4 text-center text-[#ff4d30]  hover:shadow-xl flex items-center flex-col justify-center gap-2 max-w-[800px] w-full">
            <div className="font-bold text-lg">
              Welcome, {userData?.data?.fullName}
            </div>
            <div className="text-sm ">
              <span className="font-semibold">Latitude: </span>
              <span className="text-xs">
                {userData?.data?.location?.coordinates[0]},
              </span>
              <span className="font-semibold"> Longitude: </span>
              <span className="text-xs">
                {userData?.data?.location?.coordinates[1]}
              </span>
            </div>
          </div>
        </div>

        {!currentOrder && (
          <div className="bg-white rounded-lg p-3 mt-4 mb-4 shadow w-full max-w-[800px]">
            <h3 className="text-[#ff4d30] font-semibold mb-2 ">
              Available Orders
            </h3>
            {availableAssignments?.length > 0 ? (
              <div className="space-y-3">
                {availableAssignments.map((b, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border border-orange-100 rounded-md p-2 shadow-sm hover:bg-orange-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{b?.shopName}</p>
                      <p className="text-[13px] text-gray-500">
                        <span className="text-[13px] text-gray-800">
                          Delivery Address :
                        </span>{" "}
                        {b?.deliveryAddress?.text}
                      </p>
                      <p className="text-[13px] text-gray-600">
                        {b?.items.length} items | ₹{b?.subtotal}
                      </p>
                    </div>
                    <Button
                      text="Accept"
                      extraStyle="px-2 h-8 flex items-center"
                      onClick={() => acceptOrder(b?.assignmentId)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm italic">
                No delivery available
              </p>
            )}
          </div>
        )}

        {currentOrder && (
          <div className="bg-white rounded-lg p-3 mt-4 mb-4 shadow w-full max-w-[800px]">
            <h3 className="text-[#ff4d30] font-semibold mb-2 ">
              📦Current Orders
            </h3>
            <div>
              <p className="font-medium text-gray-800">
                {currentOrder?.shop?.name}
              </p>
              <p className="text-[13px] text-gray-500">
                <span className="text-[13px] text-gray-800">
                  Delivery Address :
                </span>{" "}
                {currentOrder?.deliveryAddress?.text}
              </p>
              <p className="text-[13px] text-gray-600">
                {currentOrder?.shopOrder?.shopOrderItems.length} items | ₹
                {currentOrder?.shopOrder?.subTotal}
              </p>
            </div>
            <DeliveryBoyTracking data={currentOrder} />

            {!showOtpBox && (
              <Button
                extraStyle="px-2 w-full mt-4"
                text="Mark As Delivered"
                onClick={() => {
                  handleSendOtp();
                  setShowOtpBox(true);
                }}
              />
            )}
            {showOtpBox && (
              <div className="bg-orange-50 border border-orange-400 rounded-lg p-3 mt-6 ">
                <div className="mt-4">
                  <Input
                    label="Verify OTP from customer"
                    placeholder="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    extraStyle=""
                  />
                </div>

                <Button text="Verify" extraStyle="px-2 w-full" />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
