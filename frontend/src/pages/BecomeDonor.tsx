import React from "react";
import { motion } from "framer-motion";

export default function BecomeDonor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen pt-32"
    >
      <h1 className="text-3xl font-bold mb-4">Become a Donor</h1>
      <p>Register as a donor and help save lives.</p>
    </motion.div>
  );
}