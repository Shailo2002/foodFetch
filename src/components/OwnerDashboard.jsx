import React from "react";
import Navbar from "./Navbar";
import { FaUtensils } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "../ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import OwnerItemCard from "./OwnerItemCard.jsx";

export default function OwnerDashboard() {
  const myShopData = useSelector((state) => state.owner.myShopData);
  const navigate = useNavigate();
  return (
    <div className="bg-[#fef4ee] min-h-screen">
      <Navbar />
      {!myShopData && (
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
      )}

      {myShopData && (
        <div>
          {" "}
          <div className="flex justify-center items-center p-6 md:p-6 ">
            <div className="w-full max-w-xl">
              <div className="flex items-center justify-center gap-2 p-4">
                {" "}
                <FaUtensils className="text-[#ff4d2d] size-12" />
                <div className="font-bold text-xl pt-2">{`Welcome to ${myShopData.name}`}</div>
              </div>

              <div className="bg-white shadow-lg rounded-2xl border  border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate("/create-edit-shop")}
                  >
                    <MdModeEdit className="bg-[#ff4d2d] text-white size-7 p-1 rounded-full absolute top-2 right-2 hover:bg-[#ff5c3d]" />
                  </div>{" "}
                  <img
                    src={myShopData.image}
                    alt=""
                    className="w-full h-48 object-cover rounded-t-lg  mb-4"
                  />{" "}
                </div>
                <div className="p-4 pt-0">
                  <div className="font-bold text-2xl pb-2">{`${myShopData.name}`}</div>
                  <div className=" text-gray-500 text-sm">
                    {`${myShopData.city}, ${myShopData.state}`}
                  </div>
                  <div className=" text-gray-500 text-sm ">{`${myShopData.address}`}</div>
                </div>
              </div>
            </div>
          </div>
          {myShopData?.items?.length == 0 && (
            <div className="flex justify-center items-center p-4 md:p-6">
              <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border  border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center flex-col p-4">
                  <FaUtensils className="text-[#ff4d2d] size-16" />
                  <div className="font-bold text-xl pt-2">
                    Add Your Food Items
                  </div>
                  <div className="text-center text-gray-600 p-1">
                    Share your delicious creations with our customers by adding
                    them to the menu.
                  </div>
                  <Button
                    text={"Add Food"}
                    extraStyle="rounded-xl h-8 flex items-center px-2 m-2 bg-[#ff4d2d]"
                    onClick={() => navigate("/add-item")}
                  />
                </div>
              </div>
            </div>
          )}
          {myShopData?.items?.length > 0 && (
            <div className="flex flex-col justify-center items-center">
              {myShopData?.items?.map((item) => (
                <OwnerItemCard props={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


