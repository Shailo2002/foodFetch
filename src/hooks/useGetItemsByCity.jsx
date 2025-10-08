import axios from "axios";
import { useEffect } from "react";
import { SERVER_URL } from "../../Contant";
import { useDispatch, useSelector } from "react-redux";
import { setItemInMyCity } from "../redux/userSlice";

export default function useGetItemByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentCity) return;
    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `${SERVER_URL}/api/item/get-item-city/${currentCity}`,
          { withCredentials: true }
        );
        dispatch(setItemInMyCity(result?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [currentCity]);
}
