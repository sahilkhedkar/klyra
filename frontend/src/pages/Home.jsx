import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/Button";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-500/10 rounded-full blur-lg"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-6"
          >
            Klyra
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl px-4"
          >
            Experience seamless money transfers with cutting-edge security and lightning-fast transactions.
            Your digital wallet for the modern world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <Button
              onClick={() => navigate("/signup")}
              label="Get Started"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition transform hover:scale-105"
            />
            <Button
              onClick={() => navigate("/signin")}
              label="Sign In"
              className="px-8 py-3 bg-transparent border-2 border-emerald-500 hover:bg-emerald-500 text-emerald-400 hover:text-white font-semibold rounded-lg transition transform hover:scale-105"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl px-4"
        >
          {[
            { icon: "⚡", title: "Instant Transfers", desc: "Send money instantly to anyone, anywhere in the world.", color: "emerald" },
            { icon: "🔒", title: "Bank-Level Security", desc: "Your money is protected with advanced encryption and security measures.", color: "blue" },
            { icon: "📱", title: "Easy to Use", desc: "Simple and intuitive interface for all your financial needs.", color: "purple" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2 + index * 0.2, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
            >
                <motion.div
                  animate={{ rotate: index === 0 ? 360 : index === 1 ? [0, -10, 0] : [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: index === 0 ? "linear" : "easeInOut" }}
                  className={`w-12 h-12 bg-${item.color}-500 rounded-full flex items-center justify-center mb-4 mx-auto`}
                >
                  <span className="text-white font-bold">{item.icon}</span>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};