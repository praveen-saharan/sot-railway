import React, { useEffect } from "react";
import { motion } from "framer-motion";
import trainGif from "../assets/train-underground.gif"; 
// import trainGif from "../assets/giphy.gif";

const LoadingScreen = () => {
 

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
    >
      <img src={trainGif} alt="Loading..." className="w-64 h-64" />
      <motion.h2 
        className="text-2xl font-semibold text-gray-700 mt-4"
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
      >
        Processing your ticket...
      </motion.h2>
    </motion.div>
  );
};

export default LoadingScreen;
