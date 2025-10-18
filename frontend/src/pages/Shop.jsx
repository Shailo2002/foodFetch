import React, { useEffect, useState } from "react";
import { handleApiError } from "../utils/handleApiError";
import axios from "axios";
import { SERVER_URL } from "../../Contant";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaShop, FaUtensils } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import FoodCard from "../components/FoodCard";

function Shop() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState([]);
  const navigate = useNavigate();

  const handleShop = async () => {
    try {
      const result = await axios.get(
        `${SERVER_URL}/api/item/get-by-shop/${shopId}`,
        { withCredentials: true }
      );

      setItems(result?.data?.data?.items);
      setShop(result?.data?.data?.shop);
    } catch (error) {
      console.log("error : ", error);
      handleApiError(error);
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);
  return (
    <div className="bg-gradient-to-b from-orange-200 to-white">
      <div className="relative">
        <img src={shop?.image} className="w-full max-h-[300px] object-center" />

        <div
          className="absolute left-2 top-2 flex items-center gap-1 bg-black/60 rounded-full w-min px-2 py-1 shadow-md backdrop-blur-sm cursor-pointer"
          onClick={() => navigate("/")}
        >
          <IoArrowBack className="text-white" />
          <span className="text-white">Back</span>
        </div>

        <div className="flex flex-col items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white">
          <FaShop className="size-12" />
          <span className="font-extrabold text-3xl">{shop?.name}</span>
          <div className="flex items-center gap-1 ">
            <FaLocationDot size={20} className="text-red-800" />
            <span className="font-semibold pt-1">{shop?.address}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 mt-2">
        <div className="flex items-center gap-2 mt-6">
          <FaUtensils size={24} className="text-[#ff4d30]" />
          <span className="font-bold text-xl">Our Menu</span>
        </div>

        <div className="flex h-auto items-center justify-start flex-wrap gap-[20px] overflow-x-auto scroll-smooth scrollbar-hide px-10 mt-4 max-w-[1200px]">
          {items?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
