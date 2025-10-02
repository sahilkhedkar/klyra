export const AppBar = () => {
  return (
    <div className="h-12 flex justify-between items-center px-6 bg-black/70 backdrop-blur-md border-b border-emerald-500/20 shadow-md">
      <div className="text-white font-semibold text-lg tracking-wide">
        PayTM
      </div>

      <div className="flex items-center space-x-3">
        <div className="text-gray-300 hover:text-white cursor-pointer transition">
          Hello
        </div>
        <div className="rounded-full h-10 w-10 bg-emerald-600 flex justify-center items-center text-white font-bold shadow hover:shadow-lg transition transform hover:scale-105 cursor-pointer">
          U
        </div>
      </div>
    </div>
  );
};
