import React from "react";
import Navbar from "./Navbar";
import CategoryCard from "./CategoryCard";
import { categories } from "../category";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function UserDashboard() {
  const scrollRef = useRef();
  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
    const [showCateRightButton, setShowCateRightButton] = useState(false);


  const updateButton = () => {

  }

  const scroll = (ref, dir) => {
    if (dir === "left") {
      ref.current.scrollBy({
        left: dir == "left" ? -200 : 200,
        behavior: "smooth",
      });
    } else {
      ref.current.scrollBy({
        left: dir == "right" ? +200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#fef4ee] min-h-screen">
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <div className="w-full max-w-5xl relative">
          <h2 className="text-lg font-semibold mb-3 text-center">
            Inspiration for your first order
          </h2>

          <button
            onClick={() => scroll(scrollRef, "left")}
            className="absolute left-0 top-3/5 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-10"
          >
            {categories.map((cate, index) => (
              <div className="flex-shrink-0" key={index}>
                <CategoryCard props={cate} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll(scrollRef, "right")}
            className="absolute right-0 top-3/5 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
