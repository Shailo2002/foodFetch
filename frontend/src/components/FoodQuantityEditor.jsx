import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/userSlice";

function FoodQuantityEditor({ itemInCart, data }) {

  const dispatch = useDispatch();

  const handleIncrease = () => {
    const newQty = (itemInCart?.quantity || 0) + 1;
    dispatch(
      addToCart({
        id: data._id,
        image: data.image,
        name: data.name,
        quantity: newQty,
        price: data.price,
        shop: data.shop,
        foodtype: data.foodtype,
      })
    );
  };

  const handleDecrease = () => {
    const newQty = (itemInCart?.quantity || 0) - 1;
    if (newQty >= 0)
      dispatch(
        addToCart({
          id: data._id,
          image: data.image,
          name: data.name,
          quantity: newQty,
          price: data.price,
          shop: data.shop,
          foodtype: data.foodtype,
        })
      );
  };

  return (
    <>
      {itemInCart?.quantity ? (
        <div className="flex border border-[#ffb26b] rounded-md items-center justify-center gap-1 h-7 text-[#a64b00] bg-gradient-to-b from-[#fff7f2] to-[#ffe8d1] shadow-sm">
          <button
            className="px-1.5 py-1 h-6.5  transition rounded-l-sm  border-r-1 border-gray-300 hover:bg-[#ffe8d1] active:scale-95
"
            onClick={handleDecrease}
          >
            {" "}
            <FiMinus size={12} />
          </button>
          <span className="p-1"> {itemInCart.quantity}</span>
          <button
            className="px-1.5 py-1 h-6.5 transition rounded-r-sm border-l-1 border-gray-300 hover:bg-[#ffe8d1] active:scale-95
"
            onClick={handleIncrease}
          >
            {" "}
            <FiPlus size={12} />{" "}
          </button>
        </div>
      ) : (
        <div
          className="flex border border-[#ffb26b] rounded-md items-center justify-center gap-1 h-7 min-w-16 text-[#a64b00] bg-gradient-to-b from-[#fff7f2] to-[#ffe8d1] shadow-sm cursor-pointer"
          onClick={handleIncrease}
        >
          Add
        </div>
      )}
    </>
  );
}

export default FoodQuantityEditor;
