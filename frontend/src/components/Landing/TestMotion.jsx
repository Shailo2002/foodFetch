import { useEffect, useState } from "react";
import { slides } from "../../data/slides";
import { TiArrowDownThick } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";


const textVariant = {
  initial: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -20 : 20,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === "left" ? 20 : -20,
    transition: { duration: 0.4 },
  }),
};

// Center image fade + rotation
const imgVariant = {
  initial: (direction) => ({
    opacity: 0,
    scale: 0.7,
    rotate: direction === "left" ? -45 : 45,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.6,
    rotate: direction === "left" ? 45 : -45,
    transition: { duration: 0.4 },
  }),
};

// Orbit Dishes
const orbitVariant1 = {
  initial: (direction) => ({
    opacity: 0,
    scale: 0.8,
    x: direction === "left" ? 60 : -60,
    y: direction === "left" ? 20 : -20,
    rotate: direction === "left" ? 45 : -45,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.8,
    x: direction === "left" ? -60 : 60,
    y: direction === "left" ? 20 : -20,
    rotate: direction === "left" ? 45 : -45,
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
};

const orbitVariant2 = {
  initial: (direction) => ({
    opacity: 0,
    scale: 0.8,
    x: direction === "left" ? 50 : -50,
    y: direction === "left" ? -40 : 40,
    rotate: direction === "left" ? 45 : -45,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.8,
    x: direction === "left" ? -40 : 40,
    y: direction === "left" ? 50 : -50,
    rotate: direction === "left" ? 45 : -45,
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
};

const orbitVariant3 = {
  initial: (direction) => ({
    opacity: 0,
    scale: 0.8,
    x: direction === "left" ? 40 : -40,
    y: direction === "left" ? 50 : -50,
    rotate: direction === "left" ? 45 : -45,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.8,
    x: direction === "left" ? -50 : 50,
    y: direction === "left" ? -40 : 40,
    rotate: direction === "left" ? 45 : -45,
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
};

export default function HeroSlide() {
  const navigate = useNavigate()
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState("left"); // ← Track direction
  const currentSlide = slides[prev];

  useEffect(() => {
    const interval = setInterval(() => {
      if (direction == "left") {
        setPrev((prev) => (prev + 1) % slides.length);
      }
      if (direction == "right") {
        setPrev((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length, direction]);

  return (
    <div className="relative h-screen overflow-hidden z-0 bg-amber-50 font-sans">
      {/* Background Circle */}
      <div
        className={` absolute right-40 top-0 h-[1600px] w-[1600px] ${currentSlide?.bg} rounded-full translate-x-1/2 -translate-y-16/24 z-1`}
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-4 md:p-6 text-sm md:text-base font-medium">
          <div className="text-xl md:text-2xl font-bold tracking-wide">
            FoodFetch
          </div>

          <div className="hidden md:flex space-x-10">
            <span className="hover:text-orange-500 cursor-pointer">
              Breakfast
            </span>
            <span className="hover:text-orange-500 cursor-pointer">Lunch</span>
            <span className="hover:text-orange-500 cursor-pointer">Dinner</span>
          </div>

          <div
            className="font-semibold hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            SignIn
          </div>
        </nav>

        {/* Main Section */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center flex-1 px-6 md:px-12 pb-10 pt-10 gap-8">
          {/* LEFT TEXT SECTION */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`text-${currentSlide?.id}`}
              variants={textVariant}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0"
            >
              <p
                className={`text-3xl sm:text-4xl md:text-5xl font-bold ${currentSlide?.priceColor} mb-3 leading-tight`}
              >
                {currentSlide?.price}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-3 leading-snug text-gray-900">
                {currentSlide?.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                {currentSlide?.description}
              </p>

              <button
                className={`${currentSlide?.btn} text-sm md:text-base font-semibold tracking-wide text-white px-6 md:px-8 py-2 md:py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer`}
                onClick={() => navigate("/signin")}
              >
                ORDER NOW
              </button>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT IMAGE SECTION */}
          <div className="flex flex-col justify-center items-center w-full relative">
            {/* Top small dish */}
            <div className="flex justify-center items-center mb-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={`orbit1-${currentSlide.id}`}
                  src={currentSlide.orbitImgs[1]}
                  alt="Orbit Dish Top"
                  className="w-20 md:w-28 h-20 md:h-28 object-cover rounded-full"
                  variants={orbitVariant1}
                  custom={direction}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              </AnimatePresence>
            </div>

            {/* Side small dishes */}
            <div className="flex justify-center gap-48 md:gap-72 items-center -mt-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={`orbit2-${currentSlide.id}`}
                  src={currentSlide.orbitImgs[0]}
                  className="w-20 md:w-28 h-20 md:h-28 rounded-full"
                  alt="Orbit Dish Left"
                  variants={orbitVariant2}
                  custom={direction}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={`orbit3-${currentSlide.id}`}
                  src={currentSlide.orbitImgs[2]}
                  className="w-20 md:w-28 h-20 md:h-28 rounded-full"
                  alt="Orbit Dish Right"
                  variants={orbitVariant3}
                  custom={direction}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              </AnimatePresence>
            </div>

            {/* Center main dish */}
            <div className="flex justify-center items-center mt-6 md:mt-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={`center-${currentSlide.id}`}
                  src={currentSlide.centerImg}
                  className="w-40 md:w-60 h-40 md:h-60 rounded-full object-cover"
                  alt="Center Dish"
                  variants={imgVariant}
                  custom={direction}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-64 md:gap-108 mt-4 md:-mt-12">
              <button
                className={`${currentSlide?.btn} text-white px-2 py-2 text-sm md:text-base rounded-full hover:shadow-xl shadow transition font-semibold`}
                onClick={() => {
                  setDirection("left");
                  setPrev((prev) => (prev + 1) % slides.length);
                }}
              >
                <TiArrowDownThick />
              </button>
              <button
                className={`${currentSlide?.btn} text-white px-2 py-2 text-sm md:text-base rounded-full hover:shadow-xl shadow transition font-semibold`}
                onClick={() => {
                  setDirection("right");
                  setPrev((prev) =>
                    prev === 0 ? slides.length - 1 : prev - 1
                  );
                }}
              >
                <TiArrowDownThick />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
