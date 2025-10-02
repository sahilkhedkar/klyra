import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white">
      <AppBar />
      <div className="m-8 space-y-8">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10">
          <Balance value={"10,000"} />
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10">
          <Users />
        </div>
      </div>
    </div>
  );
};
