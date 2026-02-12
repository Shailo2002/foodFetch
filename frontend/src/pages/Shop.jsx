import React, { useEffect, useState } from "react";
import { handleApiError } from "../utils/handleApiError";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaShop, FaUtensils } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import FoodCard from "../components/FoodCard";
import { SERVER_URL } from "../../Contant";

function Shop() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState([]);
  const navigate = useNavigate();

  const handleShop = async () => {
    try {
      const result = await axios.get(
        `${SERVER_URL}/api/item/get-by-shop/${shopId}`,
        {
          withCredentials: true,
        },
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
      <div className="relative w-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 text-white py-10 px-6 sm:px-12 rounded-b-3xl shadow-lg">
        {/* Back Button */}
        <div
          className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-1.5 backdrop-blur-md cursor-pointer transition-all duration-300"
          onClick={() => navigate("/home")}
        >
          <IoArrowBack size={18} />
          <span className="text-sm font-medium">Back</span>
        </div>

        {/* Content Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-4 text-center sm:text-left">
          {/* Logo / Square Image */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md border-4 border-white/50">
            <img
              src={shop?.image}
              alt={shop?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-md tracking-tight">
              {shop?.name}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <FaLocationDot
                size={20}
                className="text-red-800 drop-shadow-sm"
              />
              <span className="text-base sm:text-lg font-semibold text-white/90 max-w-[300px]">
                {shop?.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 mt-2">
        <div className="flex items-center gap-2 mt-6">
          <FaUtensils size={24} className="text-[#ff4d30]" />
          <span className="font-bold text-xl">Our Menu</span>
        </div>

        <div className="flex h-auto items-center justify-center flex-wrap gap-[20px] overflow-x-auto scroll-smooth scrollbar-hide px-10 mt-4 max-w-[1200px]">
          {items?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
