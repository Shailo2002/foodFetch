import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BiSolidLeaf } from "react-icons/bi";
import { FaDrumstickBite } from "react-icons/fa";
import {  useSelector } from "react-redux";
import FoodQuantityEditor from "./FoodQuantityEditor";

function FoodCard({ data }) {
  if (!data) return null;

  const itemInCart = useSelector((state) =>
    state.user.cartItems.find((i) => i.id === data._id)
  );
  let stars = [];

  const renderStar = (rating) => {
    for (let i = 0; i < 5; i++) {
      if (i >= rating) {
        stars.push(<FaRegStar className="text-yellow-500 text-lg size-3.5" key={i}/>);
      } else {
        stars.push(<FaStar className="text-yellow-500 text-lg size-3.5" key={i}/>);
      }
    }
    return stars;
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

          <FoodQuantityEditor data={data} itemInCart={itemInCart} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(FoodCard);
