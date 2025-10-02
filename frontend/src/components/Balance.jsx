import { motion } from "framer-motion";

export const Balance = ({ value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-between items-center"
    >
      <div className="font-bold text-lg text-white">Your balance</div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-emerald-400 font-bold text-2xl"
      >
        ₹ {value}
      </motion.div>
    </motion.div>
  );
};
