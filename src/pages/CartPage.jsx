import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosAlert } from "react-icons/io";
import { Button } from "../ui/Button";
import CartItemCard from "../components/CartItemCard";

function CartPage() {
  const { cartItems, totalAmount } = useSelector((store) => store.user);
  const navigate = useNavigate();
  return (
    <div className="flex justify-center p-6 min-h-screen w-full bg-gradient-to-b from-orange-200 to-white">
      <div className="w-full max-w-[800px] ">
        <div className="flex items-center gap-[20px] mb-6">
          <div
            className=" z-[10]"
            onClick={() => {
              navigate("/");
            }}
          >
            <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className="font-semibold text-xl text-start"> Cart</h1>{" "}
        </div>
        {cartItems.length == 0 ? (
          <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md p-6 rounded-xl hover:shadow-2xl">
            <div
              className="text-gray-400 mb-4 animate-pulse"
              style={{ fontSize: "3rem" }}
              role="img"
              aria-label="Empty Cart"
            >
              <IoIosAlert />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven’t added anything yet.
            </p>

            <Button
              variant="primary"
              text="Go to Home"
              onClick={() => navigate("/")}
              extraStyle={"p-2"}
            />
          </div>
        ) : (
          <div className="w-full space-y-4">
            {cartItems?.map((item, index) => (
              <CartItemCard key={index} data={item} />
            ))}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border text-lg font-bold">
              <div className="">Total Amount</div>
              <div className="text-[#ff4d2d]">{`₹${totalAmount}`}</div>
            </div>
            <div className="flex justify-end">
              <Button
                text={"Check Out"}
                variant={"primary"}
                extraStyle="p-2 mt-2"
                onClick={() => navigate("/checkout")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
