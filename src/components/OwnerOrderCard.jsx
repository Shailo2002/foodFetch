import React from "react";

function OwnerOrderCard({ data }) {
  console.log("owner order card", data);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="font-semibold text-xl">{data?.user?.fullName}</div>
      <div className="text-[14px] text-gray-700">{data?.user?.email}</div>
      <div className="text-[14px] text-gray-700">📞 {data?.user?.mobile}</div>
      <div className="text-[14px] text-gray-700 pt-2">
        {data?.deliveryAddress?.text}
      </div>
      <div className="text-[14px] text-gray-700">
        <span>Lat: {data?.deliveryAddress?.latitude} </span>
        <span>Lon: {data?.deliveryAddress?.longitude}</span>
      </div>


       
            {data?.shopOrder?.shopOrderItems?.map((item, index) => (
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
  );
}

export default OwnerOrderCard;
