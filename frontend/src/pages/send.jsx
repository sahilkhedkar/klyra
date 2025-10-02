export const Send = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="w-full max-w-md p-6">
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-6 space-y-6 transform transition hover:scale-105">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Send Money</h2>
            <div className="w-16 h-1 mx-auto bg-emerald-500 rounded-full" />
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white font-bold">A</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">Friend's Name</h3>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-gray-200"
              >
                Amount (in Rs)
              </label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <button className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/50 transition transform hover:scale-105">
              Initiate Transfer
            </button>
          </div>

          {/* Optional Footer */}
          <div className="text-center text-gray-400 text-sm">
            Secure transfer powered by PayTM
          </div>
        </div>
      </div>
    </div>
  );
};
