import axios from "axios";
import React, { useState } from "react";
import { IoMdCall } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../Contant";

function OwnerOrderCard({ data }) {
  const [orderStatus, setOrderStatus] = useState(data?.shopOrders?.status);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    preparing: "bg-blue-100 text-blue-700",
    out_for_delivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  const handleUpdateStatus = async (newOrderStatus) => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/order/update-status/${data?._id}/${data?.shopOrders?.shop?._id}`,
        {
          status: newOrderStatus,
        },
        { withCredentials: true }
      );
      console.log(result?.data?.data);

      if (result.data?.success) {
        toast.success(result.data.message || "Order placed successful!");
      } else {
        toast.error(result.data?.message || "Order failed");
      }
    } catch (error) {
      handleApiError(error, "Order failed. Try again.");
    }
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-5 border border-gray-100">
      {/* User Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="font-semibold text-lg text-gray-900">
            {data?.user?.fullName}
          </h2>
          <p className="text-sm text-gray-600">{data?.user?.email}</p>
          <div className="text-sm text-gray-700 flex items-center gap-1 mt-1">
            <IoMdCall className="text-[#ff4d30]" />
            {data?.user?.mobile}
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            statusColors[orderStatus] || "bg-gray-100 text-gray-700"
          }`}
        >
          {orderStatus}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex items-start gap-2 text-sm text-gray-700 bg-orange-50 rounded-lg p-3 mb-4">
        <MdLocationOn className="text-[#ff4d30] text-lg" />
        <div>
          <div>{data?.deliveryAddress?.text}</div>
          <div className="text-xs text-gray-500">
            Lat: {data?.deliveryAddress?.latitude.toFixed(4)} | Lon:{" "}
            {data?.deliveryAddress?.longitude.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-4">
        {data?.shopOrders?.shopOrderItems?.map((item, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
          >
            <img
              src={item?.item?.image}
              alt={item?.item?.name}
              className="w-full h-28 object-cover"
            />
            <div className="p-2">
              <h3 className="font-medium text-sm text-gray-900 truncate">
                {item?.item?.name}
              </h3>
              <div className="text-xs text-gray-600 mt-1 flex justify-between">
                <span>Qty: {item?.quantity}</span>
                <span>₹{item?.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Selector */}
      <div className="flex justify-between items-center mt-5">
        <div className="text-sm text-gray-700">
          <span className="font-medium">Change Status:</span>
        </div>
        <select
          value={orderStatus}
          onChange={(e) => {
            setOrderStatus(e.target.value);
            handleUpdateStatus(e.target.value);
          }}
          className="rounded-md border border-[#ff4d30] text-[#ff4d30] px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d30] bg-white cursor-pointer"
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out_for_delivery">Out for Delivery</option>
        </select>
      </div>

      {/* Total */}
      <div className="text-right mt-4 font-semibold text-gray-900 text-sm">
        Total: ₹{data?.shopOrders?.subTotal}
      </div>
    </div>
  );
}

export default OwnerOrderCard;
