import { useEffect, useState } from "react"
import { Button } from "./Button"
import { ButtonApp } from "./ButtonApp";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            setUsers(response.data.user)
        })
    },[filter])

    return (
        <>
            <div className="font-bold text-xl mb-4">Users</div>
            <div className="my-2">
                <input 
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }}
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>
            <div className="space-y-4">
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    )
}

function User({ user }) {

    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition border border-gray-700">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-emerald-600 flex justify-center items-center text-white text-lg font-bold shadow-md">
                    {user.firstName[0]}
                </div>
                <div className="ml-3">
                    <div className="font-semibold">{user.firstName} {user.lastName}</div>
                </div>
            </div>
            <div>
                <ButtonApp onClick={(e) => {
                    navigate(`/send?id=${user._id}&name=${user.username}`)
                }} label={"Send Money"} />
            </div>
        </div>
    )
}
