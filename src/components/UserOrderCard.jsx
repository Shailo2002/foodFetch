import React from "react";
import { Button } from "../ui/Button";

function UserOrderCard({ data }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    console.log(date);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <div className="flex justify-between border-b pb-2">
        <div>
          <p className="font-semibold">order# {data?._id.slice(-6)}</p>
          <p className="text-[12px] text-gray-500 mt-1">
            {formatDate(data?.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {data?.paymentMethod?.toUpperCase()}
          </p>
          {/* <p className="text-sm text-blue-500">{data?.shopOrders[0]?.status}</p> */}
        </div>
      </div>

      {data?.shopOrders?.map((shopOrder, index) => (
        <div className=" p-2">
          <div key={index} className="pb-2 font-black">
            {shopOrder?.shop?.name}
          </div>
          <div className="flex gap-4 border-b pb-4">
            {shopOrder?.shopOrderItems?.map((item, index) => (
              <div
                className="flex flex-col border rounded-md p-1.5 "
                key={index}
              >
                <img
                  src={item?.item?.image}
                  alt=""
                  className="w-36 h-26 object-cover rounded-md border"
                />
                <div className="font-semibold px-1 pt-1">
                  {item?.item?.name}
                </div>
                <div className="text-xs text-gray-500 px-1">
                  <span>Qty: {item?.quantity}</span>
                  <span>x ₹{item?.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-1">
            <div className="font-bold ">Subtotal: ₹{shopOrder?.subTotal}</div>
            <div className="text-sm text-blue-500">{shopOrder?.status}</div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center border-t pt-2">
        <div className="font-bold">Total: ₹{data?.totalAmount}</div>
        <Button text={"Track Order"} extraStyle="px-2"/>
      </div>
    </div>
  );
}

export default UserOrderCard;
