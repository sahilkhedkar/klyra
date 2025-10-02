import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { motion } from "framer-motion";

export const Profile = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({ firstName: "", lastName: "", username: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceRes, historyRes, userRes] = await Promise.all([
          axios.get("http://localhost:8000/api/v1/account/balance", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }),
          axios.get("http://localhost:8000/api/v1/account/history", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }),
          axios.get("http://localhost:8000/api/v1/user/me", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
        ]);

        setBalance(balanceRes.data.balance);
        setTransactions(historyRes.data.transactions);
        setUser(userRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white"
    >
      <AppBar />
      <div className="m-4 sm:m-8 space-y-8 p-4 sm:p-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Balance:</strong> ₹{balance.toFixed(2)}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10"
        >
          <h3 className="text-xl font-bold mb-4">Transaction History</h3>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <p>No transactions yet.</p>
            ) : (
              transactions.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-lg border ${
                    t.type === 'sent' ? 'border-red-500 bg-red-500/10' : 'border-green-500 bg-green-500/10'
                  }`}
                >
                  <p><strong>{t.type === 'sent' ? 'Sent to' : 'Received from'}:</strong> {t.type === 'sent' ? t.to : t.from}</p>
                  <p><strong>Amount:</strong> ₹{t.amount}</p>
                  <p><strong>Date:</strong> {new Date(t.timestamp).toLocaleString()}</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};