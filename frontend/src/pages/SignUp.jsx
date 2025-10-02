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
import axios from "axios"

export const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
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
            <Heading label={"Sign up"} />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <SubHeading label={"Enter your information to create an account"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <InputBox onChange={(e) => {
              setfirstName(e.target.value)
            }} placeholder="John" label={"First Name"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <InputBox onChange={(e) => {
              setlastName(e.target.value)
            }} placeholder="Doe" label={"Last Name"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <InputBox onChange={(e) => {
              setUsername(e.target.value)
            }} placeholder="johndoe@gmail.com" label={"Email"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <InputBox onChange={(e) => {
              setPassword(e.target.value)
            }} placeholder="123456" label={"Password"} />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="pt-4"
          >
            <Button onClick={async () => {
              if (!firstName || !lastName || !username || !password) {
                setErrorMessage("Please fill in all fields");
                setShowErrorModal(true);
                return;
              }
              try {
                await axios.post("https://paytm-b2c4.onrender.com/api/v1/user/signup", {
                  username,
                  firstName,
                  lastName,
                  password
                });
                setShowModal(true);
              } catch (error) {
                setErrorMessage("Signup failed: " + (error.response?.data?.msg || error.message));
                setShowErrorModal(true);
              }
            }} label={"Sign up"} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </motion.div>
        </motion.div>
      </div>
      {showModal && (
        <SuccessModal
          message="Signup successful! Please sign in."
          onClose={() => {
            setShowModal(false);
            navigate("/signin");
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
  );
};
