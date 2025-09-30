import React from "react";
import Navbar from "./Navbar";
import { FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "../ui/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  // const myShopData = useSelector((state) => state.owner.myShopData);
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      {/* {!myShopData && ( */}
        <div className="flex justify-center items-center p-4 md:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border  border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center flex-col p-4">
              <FaUtensils className="text-[#ff4d2d] size-16" />
              <div className="font-bold text-xl pt-2">Add Your Restaurant</div>
              <div className="text-center text-gray-600 p-1">
                Join our food delivery app, and reach thousands hungry customers
                everyday
              </div>
              <Button
                text={"Get Started"}
                extraStyle="rounded-xl h-8 flex items-center px-2 m-2 bg-[#ff4d2d]"
                onClick={() => navigate("/create-edit-shop")}
              />
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

// [#ff4d2d]