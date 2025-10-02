import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { SuccessModal } from "../components/SuccessModal";
import { ErrorModal } from "../components/ErrorModal";
import axios from "axios";

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  return (
    <div className="min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative"
      >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md rounded-xl w-full max-w-md text-center p-4 sm:p-8 border border-white/10 shadow-2xl mx-4"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Heading label={"Sign in"} />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <SubHeading label={"Enter your credentials to access your account"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <InputBox onChange={(e) => {
              setUsername(e.target.value)
            }} placeholder="johndoe@gmail.com" label={"Email"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <InputBox onChange={(e) => {
              setPassword(e.target.value)
            }} placeholder="123456" label={"Password"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <Button onClick={async () => {
              try {
                const response = await axios.post("https://paytm-b2c4.onrender.com/api/v1/user/signin", {
                  username,
                  password
                });
                localStorage.setItem("token", response.data.token);

                // Fetch user data
                const userRes = await axios.get("https://paytm-b2c4.onrender.com/api/v1/user/me", {
                  headers: { Authorization: "Bearer " + response.data.token },
                });
                localStorage.setItem("user", JSON.stringify(userRes.data));

                setShowModal(true);
              } catch (error) {
                setErrorMessage("Sign in failed: " + (error.response?.data?.msg || error.message));
                setShowErrorModal(true);
              }
            }} label={"Sign in"} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </motion.div>
        </motion.div>
      </div>
      {showModal && (
        <SuccessModal
          message="Sign in successful!"
          onClose={() => {
            setShowModal(false);
            navigate("/dashboard");
          }}
        />
      )}
      {showErrorModal && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </motion.div>
    </div>
  );
};
