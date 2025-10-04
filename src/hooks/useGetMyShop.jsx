import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../../Contant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setMyShopData } from "../redux/ownerSlice";

export default function useGetMyShop() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/shop/get-my`, {
          withCredentials: true,
        });
        dispatch(setMyShopData(result?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, [userData]);
}
