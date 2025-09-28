import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoyDahsboard from "../components/DeliveryBoyDahsboard";
import Navbar from "../components/Navbar";

export default function Home() {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fff9f6]">
        {" "}
        {userData.role == "user" && <UserDashboard />}
        {userData.role == "owner" && <OwnerDashboard />}
        {userData.role == "delivery_boy" && <DeliveryBoyDahsboard />}
      </div>
    </>
  );
}
