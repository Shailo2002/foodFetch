import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";
import { SERVER_URL } from "../../Contant";

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
