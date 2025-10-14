import { useSelector } from "react-redux";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import useGetMyShop from "../hooks/useGetMyShop";
import useGetCity from "../hooks/useGetCity";
import useGetShopByCity from "../hooks/useGetShopByCity";
import useGetItemByCity from "../hooks/useGetItemsByCity";
import useGetMyOrders from "../hooks/useGetMyOrders";
import useUpdateLocation from "../hooks/useUpdateLocation";

export default function GlobalDataLoader() {
  const { userData, loading } = useSelector((state) => state.user);

  if (!loading && userData) {
    useGetMyShop();
    useGetCity();
    useGetShopByCity();
    useGetItemByCity();
    useGetMyOrders();
    useUpdateLocation();
  }

  return null;
}
