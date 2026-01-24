import React, { useEffect } from "react";
import { IoIosAlert, IoIosArrowRoundBack } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import { AddMyOrder, updateOrderStatus } from "../redux/userSlice";
import { useSocket } from "../context/SocketProvider";
import toast from "react-hot-toast";
import { Button } from "../ui/Button";
function MyOrders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const { myOrders, userData } = useSelector((state) => state.user);

  useEffect(() => {
    socket?.on("newOrder", (data) => {
      if (data?.shopOrder?.owner?._id == userData?._id) {
        dispatch(AddMyOrder(data));
        toast.success("A new order has just been placed.");
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
              navigate("/home");
            }}
          >
            <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className="font-semibold text-xl text-start"> My Orders</h1>{" "}
        </div>

        <div className="space-y-6">
          {myOrders.length <= 0 ? (
            <div className="flex justify-center p-4 min-h-screen w-full bg-gradient-to-b from-orange-200 to-white">
              <div className="w-full max-w-[800px] flex justify-center items-center">
                <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300">
                  <div
                    className="text-gray-400 mb-4 text-center"
                    style={{ fontSize: "3rem" }}
                    aria-label="No Orders Yet"
                  >
                    {userData?.data?.role === "owner" ? (
                      <MdOutlineRestaurantMenu className="size-16 text-orange-500" />
                    ) : (
                      <IoFastFoodOutline className="size-16 text-orange-500" />
                    )}
                  </div>

                  <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
                    {userData?.data?.role === "owner"
                      ? "No Orders Yet "
                      : " You haven’t ordered yet"}
                  </h2>

                  <p className="text-gray-600 mb-8 leading-relaxed max-w-[400px] mx-auto text-center">
                    {userData?.data?.role === "owner"
                      ? "You haven’t received any orders yet. Once customers start ordering, new orders will appear here instantly. "
                      : "  Feeling hungry? Browse restaurants and place your first order now!"}
                  </p>
                  {userData?.data?.role === "user" && (
                    <Button
                      variant="primary"
                      text="Order Now"
                      onClick={() => navigate("/home")}
                      extraStyle={"p-2"}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {" "}
              {myOrders?.map((order, index) =>
                userData?.data?.role === "user" ? (
                  <UserOrderCard data={order} key={index} />
                ) : userData?.data?.role === "owner" ? (
                  <OwnerOrderCard data={order} key={index} />
                ) : null
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
