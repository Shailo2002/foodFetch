import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useSelector } from "react-redux";

export default function CreateEditShop() {
  const navigate = useNavigate();
  const { myshopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  console.log(currentCity, currentState, currentAddress);

  const [name, setName] = useState(myshopData?.name || "");
  const [city, setCity] = useState(currentCity || "");
  const [state, setState] = useState(currentState || "");
  const [address, setAddress] = useState(currentAddress || "");
  

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoIosArrowRoundBack size={32} className="text-[#ff4d2d]" />
      </div>{" "}
      <div className="flex justify-center items-center p-4 md:p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl border  border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center flex-col p-4 w-full">
            <div className="rounded-full p-4 bg-orange-100">
              <FaUtensils className="text-[#ff4d2d] size-12 " />
            </div>{" "}
            <div className="font-extrabold text-2xl pt-2">Edit Shop</div>
            <Input
              label="Name"
              placeholder="Enter your Shop Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Shop Image"
              placeholder="Enter your Shop Name"
              type="file"
              accept="image/*"
            />
            <div className="flex gap-4">
              <Input
                label="City"
                placeholder="Enter your City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <Input
                label="State"
                placeholder="Enter your State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <Input
              label="Address"
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              variant="primary"
              size="md"
              text="Save"
              extraStyle="justify-center w-full"
              onClick={() => console.log(name)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
