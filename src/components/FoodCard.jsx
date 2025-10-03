import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BiSolidLeaf } from "react-icons/bi";
import { FaDrumstickBite } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  let stars = [];

  const renderStar = (rating) => {
    for (let i = 0; i < 5; i++) {
      if (i >= rating) {
        stars.push(<FaRegStar className="text-yellow-500 text-lg size-3.5" />);
      } else {
        stars.push(<FaStar className="text-yellow-500 text-lg size-3.5" />);
      }
    }
    return stars;
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
    }
  };

  return (
    <div className=" border-2 border-[#9e4816] rounded-xl shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={data?.image}
          className="w-48 h-32 object-cover object-center rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-white">
          {data?.foodtype === "veg" ? (
            <BiSolidLeaf className="text-green-600" />
          ) : (
            <FaDrumstickBite className="text-red-600" />
          )}
        </div>
      </div>
      <div className="p-2 pl-3">
        <div className="text-md font-semibold h-5">{data?.name}</div>
        <div className="flex items-center gap-0.5 mt-1 h-5">
          {renderStar(data?.rating?.average || 0)}
          <span className="ml-1">({data?.rating?.count})</span>
        </div>
        <div className="flex justify-between items-center mt-auto p-1 pt-4">
          <div className="text-md font-bold ">₹ {data?.price}</div>
          <div className="flex border rounded-full items-center justify-center gap-1 h-6 overflow-hidden shadow-sm">
            <button className="px-1 py-1 hover:bg-gray-200 transition" onClick={handleDecrease}>
              {" "}
              <FiMinus size={12} />
            </button>
            <span> {quantity}</span>
            <button className="px-1 py-1 hover:bg-gray-200 transition" onClick={handleIncrease}>
              {" "}
              <FiPlus size={12} />{" "}
            </button>

            <button className="bg-[#ff4d30]  text-white px-2 py-2 transition:color">
              {" "}
              <HiShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
