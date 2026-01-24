import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { handleApiError } from "../utils/handleApiError";
import { Button } from "../ui/Button";
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import { Input } from "../ui/Input";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

export default function DeliveryBoyDahsboard() {
  const socket = useSocket();
  const { userData } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [todayTotalEarning, setTodayTotalEarning] = useState(0);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleGetAssignments = async () => {
    try {
      const result = await axios.get(`/api/order/get-assignments`, {
        withCredentials: true,
      });
      setAvailableAssignments(result?.data?.data);
    } catch (error) {
      handleApiError(error, "Order failed. Try again.");
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      setLoading(true);
      const result = await axios.get(
        `/api/order/accept-order/${assignmentId}`,
        { withCredentials: true },
      );
      getCurrentOrder();
    } catch (error) {
      handleApiError(error, "Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`/api/order/get-current-order`, {
        withCredentials: true,
      });
      setCurrentOrder(result?.data?.data);
    } catch (error) {
      // handleApiError(error, "Order failed. Try again.");
      console.log("error :", error);
    }
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `/api/order/send-delivery-otp`,
        {
          orderId: currentOrder?._id,
          shopOrderId: currentOrder?.shopOrder?._id,
        },
        { withCredentials: true },
      );

      if (result?.data?.success) {
        toast.success(result?.data?.message || "OTP sent successfully");
      } else {
        toast.error(result?.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Please enter the OTP");

    try {
      setLoading(true);
      const result = await axios.post(
        `/api/order/verify-delivery-otp`,
        {
          shopOrderId: currentOrder?.shopOrder?._id,
          orderId: currentOrder?._id,
          otp,
        },
        { withCredentials: true },
      );

      if (result.data?.success) {
        toast.success(result.data.message || "OTP verified successfully");
      } else {
        toast.error(result.data?.message || "OTP verification failed");
      }
    } catch (error) {
      handleApiError(error, "OTP verification failed");
    } finally {
      setLoading(false);
      navigate(0);
    }
  };

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(`/api/order/get-today-deliveries`, {
        withCredentials: true,
      });

      setTodayDeliveries(result?.data?.data);
    } catch (error) {
      handleApiError(error, "OTP verification failed");
    }
  };
  useEffect(() => {
    if (!socket || userData?.data?.role !== "delivery_boy") return;
    let watchId;

    if (navigator?.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;

          setLocation({ lat: latitude, lon: longitude });

          socket.emit("updateLocation", {
            latitude,
            longitude,
            userId: userData?.data?._id,
          });
        },
        (error) => {
          console.log("Geolocation error:", error);
        },
        { enableHighAccuracy: true },
      );
    } else {
      console.log("Geolocation not supported in this browser");
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [socket, userData]);

  useEffect(() => {
    handleGetAssignments();
    getCurrentOrder();
    handleTodayDeliveries();
  }, [userData]);

  useEffect(() => {
    const handleNewAssignment = (data) => {
      toast?.success("New order Place just now!");

      setAvailableAssignments((prev) => {
        if (prev.some((item) => item.assignmentId === data.assignmentId))
          return prev;
        return [data, ...prev];
      });
    };

    socket?.on("newAssignment", handleNewAssignment);

    return () => socket?.off("newAssignment", handleNewAssignment);
  }, [socket]);

  useEffect(() => {
    const ratePerDelivery = 50;
    const todayEarning = todayDeliveries.reduce(
      (sum, d) => sum + d?.count * ratePerDelivery,
      0,
    );
    setTodayTotalEarning(todayEarning);
  }, [todayDeliveries]);

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
                {location?.lat || userData?.data?.location?.coordinates[1]},
              </span>
              <span className="font-semibold"> Longitude: </span>
              <span className="text-xs">
                {location?.lon || userData?.data?.location?.coordinates[0]}
              </span>
            </div>
          </div>
        </div>

        {/* analytics part */}
        <div className="bg-white rounded-lg p-3 mt-4 mb-4 shadow w-full max-w-[800px]">
          <h3 className="text-[#ff4d30] font-semibold mb-2 text-center sm:text-left">
            Today's Order
          </h3>

          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={todayDeliveries}>
                <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} />
                <YAxis allowDecimals={false} />
                <Tooltip
                  formatter={(value) => [value, "orders"]}
                  labelFormatter={(label) => `${label} :00`}
                />
                <CartesianGrid strokeDasharray="4 4" />
                <Bar dataKey="count" fill="#ff4d30" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="bg-gray-50 rounded-lg p-3 mt-4 mb-4 shadow-xl border-gray-50 w-full max-w-[300px] text-center">
              <h3 className=" text-xl font-semibold mb-2 ">Today's Earning</h3>
              <span className="text-green-500 font-bold text-2xl">
                ₹{todayTotalEarning}
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
                      loading={loading}
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
            <DeliveryBoyTracking
              data={{
                curstomerLocation: {
                  lat: currentOrder?.curstomerLocation?.lat,
                  lon: currentOrder?.curstomerLocation?.lon,
                },
                deliveryBoyLocation: location || {
                  lat: currentOrder?.deliveryBoyLocation?.lat,
                  lon: currentOrder?.deliveryBoyLocation?.lon,
                },
              }}
            />

            {!showOtpBox && (
              <Button
                extraStyle="px-2 w-full mt-4"
                text="Mark As Delivered"
                onClick={() => {
                  handleSendOtp();
                  setShowOtpBox(true);
                }}
                loading={loading}
              />
            )}
            {showOtpBox && (
              <div className="bg-orange-50 border border-orange-400 rounded-lg p-3 mt-6 ">
                <div className="mt-4">
                  <div className="block text-sm font-medium mb-3">
                    Verify OTP from customer
                  </div>
                  <Input
                    placeholder="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </div>

                <Button
                  text="Verify"
                  extraStyle="px-2 w-full"
                  onClick={() => handleVerifyOtp()}
                  loading={loading}
                />
                <div
                  className="block text-sm font-medium mb-1 hover:text-blue-600 text-decoration-line: underline cursor-pointer"
                  onClick={() => handleSendOtp()}
                >
                  Resend Otp
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
