import React, { useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";

export default function CreateEditShop() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { userData, currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user,
  );

  const [name, setName] = useState(myShopData?.name || "");
  const [city, setCity] = useState(currentCity || "");
  const [state, setState] = useState(currentState || "");
  const [address, setAddress] = useState(currentAddress || "");
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(`/api/shop/create-edit`, formData, {
        withCredentials: true,
      });
      dispatch(setMyShopData(result?.data?.data));
      toast.success(result?.data?.message || "shop added successful!");
      navigate("/home");
    } catch (error) {
      console.log("error : ", error);
      handleApiError(error, "shop registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-gradient-to-b from-orange-50 to-white min-h-screen">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
        onClick={() => {
          navigate("/home");
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
            <div className="font-extrabold text-2xl pt-2">
              {myShopData ? "Edit Shop" : "Create Shop"}
            </div>
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
              onChange={handleImage}
            />
            {frontendImage && (
              <img
                src={frontendImage}
                alt=""
                className="w-full h-48 object-cover rounded-lg border mb-4"
              />
            )}
            <div className="flex gap-4">
              <Input
                label="City"
                placeholder="Enter your City"
                type="text"
                value={currentCity}
                onChange={(e) => setCity(e.target.value)}
              />

              <Input
                label="State"
                placeholder="Enter your State"
                type="text"
                value={currentState}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <Input
              label="Address"
              placeholder="Enter full address"
              value={currentAddress}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              variant="primary"
              size="md"
              text="Save"
              extraStyle="justify-center w-full"
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
