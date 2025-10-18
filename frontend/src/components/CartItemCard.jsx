import React from "react";
import { MdDelete } from "react-icons/md";
import FoodQuantityEditor from "./FoodQuantityEditor";
import { BiSolidLeaf } from "react-icons/bi";
import { FaDrumstickBite } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deletefromCart, updateQuantity } from "../redux/userSlice";

function CartItemCard({ data }) {
  if (!data) return null;
  const dispatch = useDispatch();

  const handleIncrease = (id, quantity) => {
    const newQty = (quantity || 0) + 1;
    dispatch(
      updateQuantity({
        id: id,
        quantity: newQty,
      })
    );
  };

  const handleDecrease = (id, quantity) => {
    const newQty = (quantity || 0) - 1;
    if (newQty >= 0) {
      dispatch(
        updateQuantity({
          id: id,
          quantity: newQty,
        })
      );
    }
  };

    const handleDelete = (id) => {
      dispatch(
        deletefromCart({
          id: id,
        })
      );
    };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow border">
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt=""
          className="w-20 h-20 object-cover rounded-lg border"
        />
        <div>
          <h1 className="font-medium text-gray-500">{data.name}</h1>
          <p className="text-sm text-gray-500">
            {`₹${data.price} × ${data.quantity}`}
          </p>
          <p className="font-bold text-gray-900">
            ₹ {data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* food quantity editor */}
      <div className="flex items-center gap-3">
        {data?.quantity ? (
          <div className="flex border border-[#ffb26b] rounded-md items-center justify-center gap-1 h-7 text-[#a64b00] bg-gradient-to-b from-[#fff7f2] to-[#ffe8d1] shadow-sm">
            <button
              className="px-1.5 py-1 h-6.5  transition rounded-l-sm  border-r-1 border-gray-300 hover:bg-[#ffe8d1] active:scale-95
"
              onClick={() => handleDecrease(data?.id, data?.quantity)}
            >
              {" "}
              <FiMinus size={12} />
            </button>
            <span className="p-1"> {data.quantity}</span>
            <button
              className="px-1.5 py-1 h-6.5 transition rounded-r-sm border-l-1 border-gray-300 hover:bg-[#ffe8d1] active:scale-95
"
              onClick={() => handleIncrease(data?.id, data?.quantity)}
            >
              {" "}
              <FiPlus size={12} />{" "}
            </button>
          </div>
        ) : null}
        <MdDelete
          className="size-6 text-[#ff4d30] cursor-pointer  hover:bg-[#fce4d5] rounded"
          onClick={() => handleDelete(data?.id)}
        />
      </div>
    </div>
  );
}

export default CartItemCard;
