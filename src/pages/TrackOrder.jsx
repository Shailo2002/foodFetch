import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";
import axios from "axios";
import { SERVER_URL } from "../../Contant";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";

function TrackOrder() {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();
  const navigate = useNavigate();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    preparing: "bg-blue-100 text-blue-700",
    out_for_delivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  const handleGetOrder = async () => {
    try {
      const order = await axios.get(
        `${SERVER_URL}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      );
      setCurrentOrder(order?.data?.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-orange-200 to-white">
      <div className="w-full max-w-[800px] p-4">
        <div className="flex items-center gap-[20px] mb-6">
          <div
            className="cursor-pointer z-[10]"
            onClick={() => navigate("/my-orders")}
          >
            <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className="font-semibold text-xl">Track Order</h1>
        </div>

        <div className="space-y-6">
          {currentOrder?.shopOrders?.map((shopOrder, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-5 space-y-4"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-semibold text-gray-900">
                  {shopOrder?.shop?.name}
                </h3>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    statusColors[shopOrder?.status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {shopOrder?.status}
                </div>
              </div>

              <div className="space-y-1 text-gray-700 text-sm">
                <div>
                  <span className="font-semibold">Items: </span>
                  {shopOrder?.shopOrderItems?.map((item, i) => (
                    <span key={i}>
                      {item?.item?.name} × {item?.quantity}
                      {i < shopOrder?.shopOrderItems?.length - 1 && ", "}
                    </span>
                  ))}
                </div>

                <div>
                  <span className="font-semibold">Subtotal: </span>₹
                  {shopOrder?.subTotal}
                </div>

                <div>
                  <span className="font-semibold">Delivery Address: </span>
                  {currentOrder?.deliveryAddress?.text}
                </div>
              </div>

              {shopOrder?.status === "out_for_delivery" && (
                <>
                  <div className="rounded-xl bg-orange-50/50 border border-gray-100 p-4 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Delivery Boy: </span>
                      {shopOrder?.assignedDeliveryBoy?.fullName || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">Contact: </span>
                      {shopOrder?.assignedDeliveryBoy?.mobile || "N/A"}
                    </div>
                  </div>

                  {shopOrder?.assignedDeliveryBoy ? (
                    <DeliveryBoyTracking
                      data={{
                        curstomerLocation: {
                          lat: currentOrder?.deliveryAddress?.latitude,
                          lon: currentOrder?.deliveryAddress?.longitude,
                        },
                        deliveryBoyLocation: {
                          lat: shopOrder?.assignedDeliveryBoy?.location
                            ?.coordinates[1],
                          lon: shopOrder?.assignedDeliveryBoy?.location
                            ?.coordinates[0],
                        },
                      }}
                    />
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No delivery boy assigned
                    </p>
                  )}
                </>
              )}

              {(shopOrder?.status === "preparing" ||
                shopOrder?.status === "pending") && (
                <>
                  <div className="w-full overflow-hidden mt-3 rounded-xl shadow-md">
                    <div className="flex justify-center items-center bg-orange-50/60 border border-gray-100 text-sm text-gray-700 font-medium  py-2 rounded-t-xl">
                      <div className="font-semibold text-gray-900 text-center">
                        Your Order is {shopOrder?.status}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
