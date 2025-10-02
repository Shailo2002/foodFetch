import React from "react";

function CategoryCard({ props }) {
  return (
    <div className="relative border-2 border-[#ff4d30] rounded-2xl shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow">
      <img
        src={props?.image}
        className="w-30 h-30 object-cover object-center rounded-2xl hover:scale-110 transition-transform duration-300 "
      />
      <div className="absolute bottom-0 bg-gray-100 w-full text-center opacity-80 rounded-b-2xl">
        {props?.category}
      </div>
    </div>
  );
}

export default CategoryCard;
