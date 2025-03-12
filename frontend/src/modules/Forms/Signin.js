import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function Signin() {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-6 bg-slate-600 shadow-lg rounded-lg"
      >
        <SignIn />
      </motion.div>
    </div>
  );
}
