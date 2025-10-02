import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SuccessModal } from "../components/SuccessModal";
import { ErrorModal } from "../components/ErrorModal";
import axios from "axios";

export const Send = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden h-screen flex justify-center"
        >
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Send Money"} />
                    <div className="text-gray-700 text-lg font-semibold mb-4">
                        Sending to: {name}
                    </div>
                    <InputBox
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        label={"Amount (in Rs)"}
                        type="number"
                    />
                    <div className="pt-4">
                        <Button
                            onClick={async () => {
                                try {
                                    await axios.post(
                                        "https://paytm-b2c4.onrender.com/api/v1/account/transfer",
                                        {
                                            to: id,
                                            amount: parseFloat(amount),
                                        },
                                        {
                                            headers: {
                                                Authorization: "Bearer " + localStorage.getItem("token"),
                                            },
                                        }
                                    );
                                    setShowModal(true);
                                } catch (error) {
                                    setErrorMessage("Transfer failed: " + (error.response?.data?.message || error.message));
                                    setShowErrorModal(true);
                                }
                            }}
                            label={"Initiate Transfer"}
                        />
                    </div>
                </div>
            </div>
            {showModal && (
                <SuccessModal
                    message={`₹${amount} transferred successfully to ${name}!`}
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
    );
};