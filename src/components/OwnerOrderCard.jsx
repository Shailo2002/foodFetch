import axios from "axios";
import React, { useState } from "react";
import { IoMdCall } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../Contant";
import { handleApiError } from "../utils/handleApiError";
import { updateOrderStatus } from "../redux/userSlice";

function OwnerOrderCard({ data }) {
  const [availableBoys, setAvailableBoys] = useState([]);
  console.log("availabelBoys : ", availableBoys)
  const dispatch = useDispatch();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    preparing: "bg-blue-100 text-blue-700",
    out_for_delivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  const handleUpdateStatus = async (status, orderId, shopId) => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/order/update-status/${orderId}/${shopId}`,
        { status: status },
        { withCredentials: true }
      );
      console.log(result?.data);
      setAvailableBoys(result?.data?.data?.availableBoys);

      if (result.data?.success) {
        dispatch(
          updateOrderStatus({
            orderId,
            shopId,
            status,
          })
        );
        toast.success(result.data.message || "Order status updated!");
      } else {
        toast.error(result.data?.message || "Order update failed");
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
            statusColors[data?.shopOrders?.status] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {data?.shopOrders?.status}
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
          value={data?.shopOrders?.status}
          onChange={(e) => {
            handleUpdateStatus(
              e.target.value,
              data._id,
              data.shopOrders.shop._id
            );
          }}
          className="rounded-md border border-[#ff4d30] text-[#ff4d30] px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff4d30] bg-white cursor-pointer"
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out_for_delivery">Out for Delivery</option>
        </select>
      </div>

      {data?.shopOrders?.status === "out_for_delivery" && (
        <div className="bg-orange-50 rounded-lg p-3 mt-4 mb-4">
          <h3 className="text-orange-700 font-semibold mb-2">
            Available Delivery Boys
          </h3>
          {availableBoys.length > 0 ? (
            <div className="space-y-2">
              {availableBoys.map((b, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white rounded-md p-2 shadow-sm hover:bg-orange-100 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{b.fullName}</p>
                    <p className="text-sm text-gray-500">{b.mobile}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {b.latitude.toFixed(2)}, {b.longitude.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm italic">
              No delivery boy available
            </p>
          )}
        </div>
      )}

      {/* Total */}
      <div className="text-right mt-4 font-semibold text-gray-900 text-sm">
        Total: ₹{data?.shopOrders?.subTotal}
      </div>
    </div>
  );
}

export default OwnerOrderCard;
