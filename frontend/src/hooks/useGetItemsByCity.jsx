import axios from "axios";
import { useEffect } from "react";
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
          `/api/item/get-item-city/${currentCity}`,
          { withCredentials: true },
        );
        // console.log("useGetItemByCity hook : ", result?.data?.data);

        dispatch(setItemInMyCity(result?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [currentCity]);
}
