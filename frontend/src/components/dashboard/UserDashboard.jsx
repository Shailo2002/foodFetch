import Navbar from "../Navbar";
import CategoryCard from "../CategoryCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import FoodCard from "../FoodCard";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/category";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const CatescrollRef = useRef();
  const ShopScrollRef = useRef();
  const navigate = useNavigate();
  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);
  const [showShopLeftButton, setShowShopLeftButton] = useState(false);
  const [showShopRightButton, setShowShopRightButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { currentCity, shopInMyCity, ItemInMyCity, searchItems } = useSelector(
    (state) => state.user,
  );
  const [updatedItemList, setUpdatedItemList] = useState(ItemInMyCity);
  console.log("items in my city: ", ItemInMyCity);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);

      setRightButton(
        element.scrollLeft + element.clientWidth >= element.scrollWidth,
      );
    }
  };

  const handleFilterByCategory = (category) => {
    if (category == "All") {
      setUpdatedItemList(ItemInMyCity);
    } else {
      const newItemList = ItemInMyCity.filter(
        (item) => item.category === category,
      );
      setUpdatedItemList(newItemList);
    }
  };

  const scroll = (ref, dir) => {
    if (dir === "left") {
      ref.current.scrollBy({
        left: dir == "left" ? -165 : 200,
        behavior: "smooth",
      });
    } else {
      ref.current.scrollBy({
        left: dir == "right" ? +165 : 200,
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
          setShowCateRightButton,
        );
      });
    }
    if (ShopScrollRef.current) {
      ShopScrollRef.current.addEventListener("scroll", () => {
        updateButton(
          ShopScrollRef,
          setShowShopLeftButton,
          setShowShopRightButton,
        );
      });
    }
  }, []);

  useEffect(() => {
    setUpdatedItemList(ItemInMyCity);
  }, [ItemInMyCity]);

  return (
    <div className="bg-gradient-to-b from-orange-200 to-white min-h-screen">
      <Navbar />

      <div className="flex justify-center flex-col items-center">
        {/* search items */}
        {searchItems && searchItems.length > 0 && (
          <div className="w-full max-w-5xl relative bg-orange-50 rounded-xl border border-gray-200 m-4 pb-6">
            <h2 className="text-lg font-semibold mb-3 pt-6 px-10">
              Search Items
            </h2>

            <div className="flex h-auto items-center justify-center flex-wrap gap-[20px] overflow-x-auto scroll-smooth scrollbar-hide mx-2">
              {searchItems?.map((item, index) => (
                <FoodCard key={index} data={item} />
              ))}
            </div>
          </div>
        )}

        {/* shop categories */}
        <div className="w-full max-w-5xl relative">
          <h2 className="text-lg font-semibold mb-3 pt-6 px-10">
            What's On Your Mind?
          </h2>

          {showCateLeftButton && (
            <button
              onClick={() => scroll(CatescrollRef, "left")}
              className="absolute left-0 top-3/5 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 "
            >
              <FaChevronLeft />
            </button>
          )}

          <div
            ref={CatescrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide mx-8 pt-4 px-4 "
          >
            {categories?.map((cate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                viewport={{ once: true, amount: 0.1 }}
                className="flex-shrink-0"
                onClick={() => {
                  setSelectedCategory(cate.category);
                  handleFilterByCategory(cate.category);
                }}
              >
                <CategoryCard
                  name={cate.category}
                  image={cate.image}
                  selectedCategory={selectedCategory}
                />
              </motion.div>
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
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-10 pt-4"
            ref={ShopScrollRef}
          >
            {shopInMyCity?.map((shop, index) => (
              <div
                className="flex-shrink-0"
                key={index}
                onClick={() => navigate(`/shop/${shop._id}`)}
              >
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

          <div className="flex h-auto items-center justify-center flex-wrap gap-[20px] overflow-x-auto scroll-smooth scrollbar-hide px-10">
            {updatedItemList?.map((item, index) => (
              <FoodCard key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
