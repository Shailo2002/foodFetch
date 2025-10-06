import React from "react";
import { Button } from "../ui/Button";
import { MdOutlineAccessTime } from "react-icons/md";

function UserOrderCard({ data }) {
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
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase">
            {data?.paymentMethod}
          </p>
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
        />
      </div>
    </div>
  );
}

export default UserOrderCard;
