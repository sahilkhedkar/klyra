export const ButtonApp = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-emerald-500/30 transition text-sm">
      {label}
    </button>
  );
};
