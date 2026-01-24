import React from "react";
import { motion } from "framer-motion";

export default function CategoryCard({ name, image, selectedCategory }) {
  const isSelected = selectedCategory === name;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center cursor-pointer"
    >
      <motion.div
        animate={{
          borderColor: isSelected ? "#d04b26" : "#000",
          scale: isSelected ? 1.1 : 1,
          boxShadow: isSelected
            ? "0px 0px 20px rgba(208,75,38,0.6)"
            : "0px 0px 10px rgba(0,0,0,0.1)",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="relative border-2 rounded-full w-36 h-36 flex items-center justify-center overflow-hidden"
      >
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center rounded-full"
          animate={{
            scale: isSelected ? 1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="mt-2 text-center opacity-80 font-medium">{name}</div>
    </motion.div>
  );
}
