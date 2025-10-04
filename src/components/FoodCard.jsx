import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BiSolidLeaf } from "react-icons/bi";
import { FaDrumstickBite } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

function FoodCard({ data }) {
  if (!data) return null;

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
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
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
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
    }
  };

  return (
    <div className=" border-2 border-[#9e4816] rounded-xl shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={data?.image}
          className="w-56 h-36 md:w-64 md:h-40 object-cover rounded-t-lg"
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
         

          {/* additional change: */}
          {quantity ? (
            <div className="flex border border-[#ffb26b] rounded-md items-center justify-center gap-1 h-7 text-[#a64b00] bg-gradient-to-b from-[#fff7f2] to-[#ffe8d1] shadow-sm">
              <button
                className="px-1.5 py-1 h-6.5  transition rounded-l-sm  border-r-1 border-gray-300 hover:bg-[#ffe8d1] active:scale-95
"
                onClick={handleDecrease}
              >
                {" "}
                <FiMinus size={12} />
              </button>
              <span className="p-1"> {quantity}</span>
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
            <div className="flex border border-[#ffb26b] rounded-md items-center justify-center gap-1 h-7 min-w-16 text-[#a64b00] bg-gradient-to-b from-[#fff7f2] to-[#ffe8d1] shadow-sm cursor-pointer" onClick={handleIncrease}>
              Add
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FoodCard);
