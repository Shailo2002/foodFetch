import React from "react";

function CategoryCard({ name, image, selectedCategory }) {
  return (
    <div
      className={`relative border-2 border-[#9e4816] rounded-2xl shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow ${
        selectedCategory === name && "border-5 border-green-400 "
      }`}
    >
      <img
        src={image}
        className="w-30 h-30 object-cover object-center rounded-xl hover:scale-110 transition-transform duration-300 "
      />
      <div className="absolute bottom-0 bg-gray-100 w-full text-center opacity-80 rounded-b-2xl">
        {name}
      </div>
    </div>
  );
}

export default React.memo(CategoryCard);
