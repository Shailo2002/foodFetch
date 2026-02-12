import axios from "axios";
import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setMyShopData } from "../redux/ownerSlice";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "../../Contant";

export default function OwnerItemCard({ props }) {
  const dispatch = useDispatch();

  const handleDeleteItem = async (itemId) => {
    try {
      const result = await axios.delete(`${SERVER_URL}/api/item/delete-item/${itemId}`, {
        withCredentials: true,
      });
      dispatch(setMyShopData(result?.data?.data));
      toast.success("item deleted successfully");
    } catch (error) {
      console.log("error : ", error);
      handleApiError(error, "shop registration failed. Try again.");
    }
  };

  const navigate = useNavigate();
  return (
    <div
      key={props._id}
      className="flex gap-4 border border-[#ff4d30] m-2 rounded-lg w-full max-w-xl relative bg-white  shadow-lg hover:shadow-xl"
    >
      <div>
        {" "}
        <img
          src={props.image}
          className="w-28 h-28 object-cover object-center rounded-l-lg"
        />
      </div>
      <div className="p-2">
        {" "}
        <div>
          {" "}
          <div className="leading-tight">
            <div className="text-sm text-[#ff4d30] font-semibold h-5">
              {" "}
              {props.name}
            </div>
            <div className="h-5">
              {" "}
              <span className="text-sm text-black font-semibold ">
                Category:{" "}
              </span>
              {props.category}
            </div>
            <div className="h-5">
              {" "}
              <span className="text-sm text-black font-semibold ">
                Food Type:{" "}
              </span>
              {props.foodtype}
            </div>
          </div>
        </div>
        <div className="text-sm text-[#ff4d30] font-semibold pt-3">
          {props.price}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 absolute bottom-3 right-3">
        {" "}
        <MdEdit
          className="size-5 text-[#ff4d30] cursor-pointer hover:bg-[#fce4d5] rounded "
          onClick={() => navigate(`/edit-item/${props._id}`)}
        />
        <MdDelete
          className="size-5 text-[#ff4d30] cursor-pointer  hover:bg-[#fce4d5] rounded"
          onClick={() => handleDeleteItem(props._id)}
        />
      </div>
    </div>
  );
}
