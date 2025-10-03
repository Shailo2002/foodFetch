import React, { useEffect } from "react";
import Navbar from "./Navbar";
import CategoryCard from "./CategoryCard";
import { categories } from "../category";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../../Contant";
import FoodCard from "./FoodCard";

export default function UserDashboard() {
  const CatescrollRef = useRef();
  const ShopScrollRef = useRef();

  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);
  const [showShopLeftButton, setShowShopLeftButton] = useState(false);
  const [showShopRightButton, setShowShopRightButton] = useState(false);
  const { currentCity, shopInMyCity, ItemInMyCity } = useSelector(
    (state) => state.user
  );


  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      console.log(element.scrollLeft, element.clientWidth, element.scrollWidth);

      setRightButton(
        element.scrollLeft + element.clientWidth >= element.scrollWidth
      );
    }
  };

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

  useEffect(() => {
    if (CatescrollRef.current) {
      CatescrollRef.current.addEventListener("scroll", () => {
        updateButton(
          CatescrollRef,
          setShowCateLeftButton,
          setShowCateRightButton
        );
      });
    }
    if (ShopScrollRef.current) {
      ShopScrollRef.current.addEventListener("scroll", () => {
        updateButton(
          ShopScrollRef,
          setShowShopLeftButton,
          setShowShopRightButton
        );
      });
    }
  }, []);

  return (
    <div className="bg-[#fef4ee] min-h-screen">
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        {/* shop categories */}
        <div className="w-full max-w-5xl relative">
          <h2 className="text-lg font-semibold mb-3 pt-6 px-10">
            Inspiration for your first order
          </h2>

          {showCateLeftButton && (
            <button
              onClick={() => scroll(CatescrollRef, "left")}
              className="absolute left-0 top-3/5 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
            >
              <FaChevronLeft />
            </button>
          )}

          <div
            ref={CatescrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-10"
          >
            {categories?.map((cate, index) => (
              <div className="flex-shrink-0" key={index}>
                <CategoryCard name={cate.name} image={cate.image} />
              </div>
            ))}
          </div>

          {!showCateRightButton && (
            <button
              onClick={() => scroll(CatescrollRef, "right")}
              className="absolute right-0 top-3/5 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        {/* shops div */}
        <div className="w-full max-w-5xl relative">
          <h2 className="text-lg font-semibold mb-3 pt-6 px-10">
            {`Best shop in ${currentCity}`}
          </h2>

          {showShopLeftButton && (
            <button
              onClick={() => scroll(ShopScrollRef, "left")}
              className="absolute left-0 top-3/5 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
            >
              <FaChevronLeft />
            </button>
          )}

          <div
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-10"
            ref={ShopScrollRef}
          >
            {shopInMyCity?.map((shop, index) => (
              <div className="flex-shrink-0" key={index}>
                <CategoryCard name={shop.name} image={shop.image} />
              </div>
            ))}
          </div>

          {!showShopRightButton && (
            <button
              onClick={() => scroll(ShopScrollRef, "right")}
              className="absolute right-0 top-3/5 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        {/* food items */}
        <div className="w-full max-w-5xl relative">
          <h2 className="text-lg font-semibold mb-3 pt-6 px-10">
            Suggested Food Items
          </h2>

          <div
            className="flex h-auto flex-wrap gap-[20px] overflow-x-auto scroll-smooth scrollbar-hide px-10"
          >
            {ItemInMyCity?.map((item, index) => (
                <FoodCard  key={index} data={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
