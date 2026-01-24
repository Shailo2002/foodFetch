import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

export default function useGetMyOrders() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.id);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get(`/api/order/my-orders`, {
          withCredentials: true,
        });

        dispatch(setMyOrders(result?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [userId]);
}
