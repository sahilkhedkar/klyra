import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const AppBar = () => {
  const navigate = useNavigate();
  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserInitial(userData.firstName[0].toUpperCase());
    }
  }, []);

  return (
    <div className="h-12 flex justify-between items-center px-4 sm:px-6 bg-black/70 backdrop-blur-md border-b border-emerald-500/20 shadow-md">
      <div
        className="text-white font-semibold text-lg tracking-wide cursor-pointer hover:text-emerald-400 transition"
        onClick={() => navigate("/")}
      >
        Klyra
      </div>

      <div className="flex items-center space-x-3">
        <div className="text-gray-300 hover:text-white cursor-pointer transition">
          Hello
        </div>
        <div
          className="rounded-full h-10 w-10 bg-emerald-600 flex justify-center items-center text-white font-bold shadow hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          {userInitial}
        </div>
        <button
          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded transition"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
