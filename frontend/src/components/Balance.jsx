export const Balance = ({ value }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="bg-green-400 font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};
