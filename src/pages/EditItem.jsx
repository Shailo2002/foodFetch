import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMyShopData } from "../redux/ownerSlice";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/handleApiError";
import { SERVER_URL } from "../../Contant";

export default function EditItem() {
  const {itemId} = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [loading, setLoading] = useState(false)
  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("foodtype", foodType);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `${SERVER_URL}/api/item/edit-item/${itemId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(setMyShopData(result?.data?.data));
      toast.success(result.data.message || "shop added successful!");
      navigate("/");
    } catch (error) {
      console.log("error : ", error);
      handleApiError(error, "shop registration failed. Try again.");
    } finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    const getItem = async () => {

      const result = await axios.get(
        `${SERVER_URL}/api/item/get-item/${itemId}`,
        {
          withCredentials: true,
        }
      );
      setName(result?.data?.data?.name || "");
      setCategory(result?.data?.data?.category || "");
      setFoodType(result?.data?.data?.foodType || "");
      setPrice(result?.data?.data?.price || "");
      setFrontendImage(result?.data?.data?.image || "");
    };
    getItem();
  }, []);

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
            <div className="font-extrabold text-2xl p-2">Edit Item</div>
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
            <Input
              type="number"
              label="Price"
              placeholder="Enter your price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="w-full">
              <label className="block text-sm font-medium  mb-1">
                Select Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg hover:ring-[#ff4d30] hover:border-gray-500 w-full block p-1.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d30] focus:border-[#ff4d30] mb-4"
              >
                <option value="">-- Select Category --</option>{" "}
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium  mb-1">
                Select Food Type
              </label>
              <select
                value={foodType}
                onChange={(e) => {
                  setFoodType(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg hover:ring-[#ff4d30] hover:border-gray-500 w-full block p-1.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d30] focus:border-[#ff4d30] mb-4"
              >
                <option key={"veg"} value={"veg"}>
                  veg
                </option>
                <option key={"non veg"} value={"non veg"}>
                  non veg
                </option>
              </select>
            </div>
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
