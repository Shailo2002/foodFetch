import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosAlert } from "react-icons/io";
import { Button } from "../ui/Button";
import CartItemCard from "../components/CartItemCard";
import EmptyCartCard from "../components/EmptyCartCard";

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
          <EmptyCartCard/>
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
