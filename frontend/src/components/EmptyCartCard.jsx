import React from 'react'
import { IoIosAlert } from 'react-icons/io';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

function EmptyCartCard() {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center bg-white border border-gray-300 shadow-md p-6 rounded-xl hover:shadow-2xl">
      <div
        className="text-gray-400 mb-4 animate-pulse"
        style={{ fontSize: "3rem" }}
        role="img"
        aria-label="Empty Cart"
      >
        <IoIosAlert />
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything yet.
      </p>

      <Button
        variant="primary"
        text="Go to Home"
        onClick={() => navigate("/home")}
        extraStyle={"p-2"}
      />
    </div>
  );
}

export default EmptyCartCard
