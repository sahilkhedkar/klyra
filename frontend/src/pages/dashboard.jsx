import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("https://paytm-b2c4.onrender.com/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white overflow-hidden relative"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10">
        <AppBar />
        <div className="p-4 sm:p-8 space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10"
          >
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
                ></motion.div>
              </div>
            ) : (
              <Balance value={balance.toFixed(2)} />
            )}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10"
          >
            <Users />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
