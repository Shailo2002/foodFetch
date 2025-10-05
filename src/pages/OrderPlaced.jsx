import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center p-6 min-h-screen w-full bg-gradient-to-b from-orange-200 to-white">
      <div className="w-full max-w-[800px] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md p-6 rounded-xl hover:shadow-2xl">
          <div
            className="text-gray-400 mb-4  text-center"
            style={{ fontSize: "3rem" }}
            aria-label="Empty Cart"
          >
            <FaCheckCircle className="size-16 text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-[400px] mx-auto text-center">
            Thank you for your purchase! Your order is being prepared. You can
            track your order status anytime in the{" "}
            <span className="font-bold text-black ">My Orders</span> section.
          </p>

          <Button
            variant="primary"
            text="Back to My Orders"
            onClick={() => navigate("/my-orders")}
            extraStyle={"p-2"}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;

