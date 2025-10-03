import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../../Contant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setShopInMyCity } from "../redux/userSlice";

export default function useGetShopByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(
          `${SERVER_URL}/api/shop/get-shop-city/${currentCity}`,
          { withCredentials: true }
        );
        console.log("shop by city hook :", result?.data?.data);
        dispatch(setShopInMyCity(result?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, [currentCity]);
}
