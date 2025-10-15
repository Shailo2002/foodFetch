import React from "react";

function FoodTypeIcon({ className = "w-6 h-6 text-green-700" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3387 3387"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="85"
    >
      <rect
        x="338"
        y="320"
        width="2739"
        height="2773"
        fill="white"
        stroke="currentColor"
      />
      <circle cx="1707" cy="1733" r="789" fill="currentColor" />
    </svg>
  );
}

export default FoodTypeIcon;
