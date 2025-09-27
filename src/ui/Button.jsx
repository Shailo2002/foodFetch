import React from "react";

const variantStyles = {
  primary:
    "bg-[#ff4d30] text-white font-semibold rounded-md py-2 hover:bg-[#e04329] transition mb-3 cursor-pointer",
  secondary:
    "bg-gray-200 text-gray-800 font-semibold rounded-md py-2 hover:bg-gray-300 transition mb-3 cursor-pointer",
  outline:
    "border border-[#ff4d30] text-[#ff4d30] font-semibold rounded-md py-2 hover:bg-[#ff4d30] hover:text-white transition mb-3 cursor-pointer",
};

export const Button = ({
  text,
  variant = "primary",
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  extraStyle = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        ${variantStyles[variant]} 
        ${fullWidth ? "w-full" : ""}
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
        ${extraStyle}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          {startIcon && <span className="pr-2">{startIcon}</span>}
          <Spinner />
          {endIcon && <span className="pl-2">{endIcon}</span>}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {startIcon && <span className="pr-2">{startIcon}</span>}
          {text}
          {endIcon && <span className="pl-2">{endIcon}</span>}
        </div>
      )}
    </button>
  );
};

// Simple circular spinner
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    ></path>
  </svg>
);
