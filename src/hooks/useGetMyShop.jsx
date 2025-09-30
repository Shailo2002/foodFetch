import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../../Contant";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setMyShopData } from "../redux/ownerSlice";

export default function useGetMyShop() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${SERVER_URL}/api/shop/get-my`, {
          withCredentials: true,
        });
        console.log("result shop hook ", result.data.data)
        dispatch(setMyShopData(result.data.data));
      } catch (error) {
        console.log(error);
        toast.error("error");
      }
    };
    fetchShop();
  }, []);
}
