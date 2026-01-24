import React from "react";
import { useSelector } from "react-redux";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoyDahsboard from "../components/DeliveryBoyDahsboard";
import UserDashboard from "../components/dashboard/UserDashboard";

export default function Home() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div>
      {" "}
      {userData.data.role == "user" && <UserDashboard />}
      {userData.data.role == "owner" && <OwnerDashboard />}
      {userData.data.role == "delivery_boy" && <DeliveryBoyDahsboard />}
    </div>
  );
}
