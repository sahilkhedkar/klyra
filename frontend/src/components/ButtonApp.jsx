export const ButtonApp = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-emerald-500/30 transition transform hover:scale-105">
      {label}
    </button>
  );
};
