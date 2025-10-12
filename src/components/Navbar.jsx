import React, { useEffect, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { handleApiError } from "../utils/handleApiError";
import { SERVER_URL } from "../../Contant";
import { clearUserData, setUserData } from "../redux/userSlice";
import { setMyShopData } from "../redux/ownerSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { userData, currentCity, cartItems, myOrders } = useSelector(
    (state) => state.user
  );
  const myShopData = useSelector((state) => state.owner.myShopData);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(0)

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      console.log("logout button");

      const response = await axios.get(`${SERVER_URL}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(clearUserData());
      dispatch(setMyShopData(null));

      toast.success("logout successfully");
    } catch (error) {
      handleApiError(error, "Logout failed. Try again.");
    }
  };

  const userInitial = userData?.data?.fullName?.charAt(0)?.toUpperCase();

  // Reusable logout menu
  const LogoutMenu = () => (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 py-2 w-40 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-200 z-50 pointer-events-auto group-hover:pointer-events-auto hover:opacity-100 hover:pointer-events-auto">
      <div className="w-full text-left px-4 py-2 font-medium hover:bg-gray-50">
        {userData?.data.fullName}
      </div>
      <button
        className="w-full text-left px-4 py-2 font-medium hover:bg-gray-50"
        onClick={() => navigate("/my-orders")}
      >
        My Order
      </button>
      <button
        onClick={handleLogOut}
        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
      >
        Logout
      </button>
    </div>
  );

  useEffect(() => {
    let tempData = 0 ;
   myOrders.forEach(order => {
      if (order?.shopOrders?.status !== "delivered") {
        tempData += 1;
      }
    });
    setPendingOrder(tempData)
  }, [myOrders])
  return (
    <div>
      <nav className="bg-[#fff9f6] shadow-[0_4px_12px_rgba(255,77,48,0.15)] border-b border-[#ffe3db] px-4 sm:px-6 py-3 flex justify-between items-center relative">
        <div className="hidden md:block text-2xl font-extrabold text-[#ff4d30] tracking-wide">
          FoodFetch
        </div>

        <div className=" md:hidden flex items-center gap-1">
          <MdOutlineLocationOn size={20} className="text-[#ff4d30]" />
          <span>{currentCity}</span>
        </div>

        <div className="hidden md:flex items-center gap-5">
          {/* Location */}
          <div className="flex items-center gap-1 text-gray-700">
            <MdOutlineLocationOn size={24} className="text-[#ff4d30]" />
            <span className="font-medium">{currentCity}</span>
          </div>

          {/* Search */}
          {userData.data.role == "user" && (
            <SearchBar currentCity={currentCity} />
          )}

          {/* Cart & Profile */}
          <div className="flex items-center gap-4">
            {userData.data.role == "owner" && myShopData && (
              <div className="flex gap-2">
                {" "}
                <button
                  onClick={() => {
                    navigate("/add-item");
                  }}
                  className="min-w-24 text-left px-2 py-1 text-red-500 bg-red-100 hover:bg-red-200 transition flex justify-center cursor-pointer rounded-lg items-center gap-0.5"
                >
                  <FaPlus />
                  Add Item
                </button>
                <button
                  onClick={() => navigate("/my-orders")}
                  className="relative min-w-24 text-left px-3 py-2 text-red-500 bg-red-100 hover:bg-red-200 transition flex justify-center items-center cursor-pointer rounded-lg"
                >
                  Pending Order
                  <span className="absolute -top-1 -right-1 bg-[#ff4d30] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                    {pendingOrder}
                  </span>
                </button>
              </div>
            )}

            {userData.data.role == "user" && (
              <button
                className="relative inline-flex items-center text-gray-700 hover:text-[#ff4d30] transition"
                onClick={() => navigate("/cart")}
              >
                <LuShoppingCart size={24} />
                <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 z-10 bg-[#ff4d30] text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-md ">
                  {cartItems.length}
                </span>
              </button>
            )}

            {/* Profile + Hover Popup */}
            <div className="relative group">
              <div className="bg-[#ff4d30] w-9 h-9 flex items-center justify-center rounded-full text-white font-semibold text-lg cursor-pointer hover:bg-[#ff674d] transition">
                {userInitial}
              </div>
              <LogoutMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {userData?.data?.role === "user" && (
            <button
              className="relative inline-flex items-center text-gray-700 hover:text-[#ff4d30] transition"
              onClick={() => navigate("/cart")}
            >
              <LuShoppingCart size={24} />
              <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 z-10 bg-[#ff4d30] text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-md ">
                {cartItems.length}
              </span>
            </button>
          )}

          {userData.data.role == "owner" && myShopData && (
            <div className="flex gap-2">
              {" "}
              <button
                onClick={() => {
                  navigate("/add-item");
                }}
                className="min-w-24 text-left px-2 py-2 text-red-500 bg-red-100 hover:bg-red-200 transition flex justify-center cursor-pointer rounded-lg items-center gap-0.5"
              >
                <FaPlus />
                Add Item
              </button>
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#ff4d30] text-3xl focus:outline-none"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-[64px] right-0 w-full bg-white border-t border-[#ffe3db] flex flex-col gap-4 p-4 shadow-md md:hidden z-50">
            <button
              className="flex items-center gap-2 text-gray-700 hover:text-[#ff4d30] transition"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </button>
            <button
              onClick={handleLogOut}
              className="text-red-500 hover:text-red-600 text-left"
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {userData.data.role == "user" && (
        <div className="block md:hidden mx-6 my-6">
          <SearchBar fullWidth currentCity={currentCity} />
        </div>
      )}
    </div>
  );
}
