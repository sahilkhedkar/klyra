import { useEffect, useState } from "react"
import { motion } from "framer-motion";
import { Button } from "./Button"
import { ButtonApp } from "./ButtonApp";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("https://paytm-b2c4.onrender.com/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            setUsers(response.data.user)
        })
    },[filter])

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-bold text-xl mb-4"
            >
                Users
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="my-2"
            >
                <input
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
            </motion.div>
            <div className="space-y-4">
                {users.map((user, index) => (
                    <motion.div
                        key={user._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <User user={user} />
                    </motion.div>
                ))}
            </div>
        </>
    )
}

function User({ user }) {

    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex justify-between items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition border border-white/10 shadow-lg"
        >
            <div className="flex items-center">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 flex justify-center items-center text-white text-lg font-bold shadow-md"
                >
                    {user.firstName[0]}
                </motion.div>
                <div className="ml-3">
                    <div className="font-semibold text-white">{user.firstName} {user.lastName}</div>
                    <div className="text-gray-400 text-sm">{user.username}</div>
                </div>
            </div>
            <div>
                <ButtonApp onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.username}`)
                }} label={"Send Money"} />
            </div>
        </motion.div>
    )
}
