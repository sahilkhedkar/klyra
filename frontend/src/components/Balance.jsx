export const Balance = ({ value }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="font-bold text-lg">Your balance</div>
      <div className="text-emerald-400 font-bold text-xl">₹ {value}</div>
    </div>
  );
};
