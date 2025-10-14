import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import { AddMyOrder, updateOrderStatus } from "../redux/userSlice";
import { useSocket } from "../context/SocketProvider";

function MyOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket()
  const { myOrders, userData } = useSelector((state) => state.user);

  useEffect(() => {
    socket?.on("newOrder", (data) => {
      console.log(data);
      if (data?.shopOrder?.owner?._id == userData?._id) {
        dispatch(AddMyOrder(data));
      }
    });
    socket?.on("orderStatus", ({ userId, orderId, shopId, status }) => {
      if (userId == userData?.data?._id) {
        dispatch(
          updateOrderStatus({
            orderId,
            shopId,
            status,
          })
        );
      }
    });

    return () => {
      socket?.off("newOrder");
      socket?.off("orderStatus");
    };
  }, [socket]);

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-orange-200 to-white">
      <div className="w-full max-w-[800px] p-4">
        {/* header */}
        <div className="flex items-center gap-[20px] mb-6">
          <div
            className=" z-[10]"
            onClick={() => {
              navigate("/");
            }}
          >
            <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className="font-semibold text-xl text-start"> My Orders</h1>{" "}
        </div>

        <div className="space-y-6">
          {myOrders.map((order, index) =>
            userData?.data?.role === "user" ? (
              <UserOrderCard data={order} key={index} />
            ) : userData?.data?.role === "owner" ? (
              <OwnerOrderCard data={order} key={index} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
