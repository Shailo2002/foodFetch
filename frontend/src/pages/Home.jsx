import React from "react";
import { useSelector } from "react-redux";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoyDahsboard from "../components/DeliveryBoyDahsboard";
import UserDashboard from "../components/dashboard/UserDashboard";

export default function Home() {
  const { userData } = useSelector((state) => state.user);

  if (!userData || !userData.data) {
    return null; // or a loader
  }
  const role = userData?.data?.role;

  return (
    <div>
      {" "}
      {role === "user" && <UserDashboard />}
      {role === "owner" && <OwnerDashboard />}
      {role === "delivery_boy" && <DeliveryBoyDahsboard />}
    </div>
  );
}
