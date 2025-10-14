import { useSelector } from "react-redux";
import useGetMyShop from "../hooks/useGetMyShop";
import useGetCity from "../hooks/useGetCity";
import useGetShopByCity from "../hooks/useGetShopByCity";
import useGetItemByCity from "../hooks/useGetItemsByCity";
import useGetMyOrders from "../hooks/useGetMyOrders";
import useUpdateLocation from "../hooks/useUpdateLocation";
import React from "react";

export default function GlobalDataLoader() {
  const { userData, loading } = useSelector((state) => state.user);

  useGetMyShop();
  useGetCity();
  useGetShopByCity();
  useGetItemByCity();
  useGetMyOrders();
  useUpdateLocation();


  return null;
}
