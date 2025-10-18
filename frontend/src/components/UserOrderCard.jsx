import React, { useState } from "react";
import { Button } from "../ui/Button";
import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../Contant";

function UserOrderCard({ data }) {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState({});
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    preparing: "bg-blue-100 text-blue-700",
    out_for_delivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  const handleRating = async (rating, itemId) => {
    try {
      const result = await axios.post(
        `${SERVER_URL}/api/item/rating`,
        { rating, itemId },
        { withCredentials: true }
      );
      setSelectedRating((prev) => ({
        ...prev,
        [itemId]: rating,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-3">
        <div>
          <p className="font-semibold text-gray-900 text-lg">
            Order #{data?._id?.slice(-6)}
          </p>
          <p className="text-[12px] text-gray-500 flex items-center gap-1 mt-1">
            <MdOutlineAccessTime className="text-[#ff4d30]" />
            {formatDate(data?.createdAt)}
          </p>
        </div>

        {/* payment status */}
        <div className="flex flex-col items-end gap-1">
          <div
            className={`flex items-center pl-3 gap-1 text-xs font-semibold rounded-full capitalize bg-gray-100 text-gray-700 ${
              data?.paymentMethod !== "online" ? "py-2 p-3" : ""
            }`}
          >
            {data?.paymentMethod === "online"
              ? "Online Payment"
              : "Cash on Delivery"}

            {data?.paymentMethod === "online" && (
              <div
                className={`px-2 py-2 text-xs font-semibold rounded-r-full ${
                  data?.payment
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data?.payment ? "Payment Successful" : "Payment Failed"}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Shop Orders */}
      {data?.shopOrders?.map((shopOrder, shopIndex) => (
        <div
          key={shopIndex}
          className="rounded-xl bg-orange-50/50 border border-gray-100 p-4"
        >
          {/* Shop Name + Status */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">
              {shopOrder?.shop?.name}
            </h3>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                statusColors[shopOrder?.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {shopOrder?.status}
            </div>
          </div>

          {/* Items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {shopOrder?.shopOrderItems?.map((item, itemIndex) => (
              <div key={itemIndex}>
                {" "}
                <div
                  key={itemIndex}
                  className="rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={item?.item?.image}
                    alt={item?.item?.name}
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-2">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {item?.item?.name}
                    </h4>
                    <div className="text-xs text-gray-600 mt-1 flex justify-between">
                      <span>Qty: {item?.quantity}</span>
                      <span>₹{item?.price}</span>
                    </div>
                  </div>
                </div>
                {shopOrder?.status === "delivered" && (
                  <div className="flex gap-1 text-lg justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className={`${selectedRating[item?.item._id] >= star ? "text-yellow-400":"text-gray-400"}`} onClick={() => handleRating(star, item?.item?._id)}>★</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="flex justify-end mt-3">
            <p className="font-semibold text-gray-800 text-sm">
              Subtotal: ₹{shopOrder?.subTotal}
            </p>
          </div>
        </div>
      ))}
      {/* Total + Track */}
      <div className="flex justify-between items-center border-t pt-3">
        <div className="font-semibold text-gray-900 text-base">
          Total: ₹{data?.totalAmount}
        </div>
        <Button
          text="Track Order"
          extraStyle="px-3 py-1 text-sm font-semibold bg-[#ff4d30] hover:bg-[#ff674d] text-white rounded-full shadow-sm transition-all duration-200"
          onClick={() => navigate(`/track-order/${data._id}`)}
        />
      </div>
    </div>
  );
}

export default UserOrderCard;
