import { Label } from "./ui/label";

const AmountInput = () => {
  return (
    <>
      <Label htmlFor="amount">Amount</Label>
      <input
        id="amount"
        placeholder="0"
        type="number"
        className=" text-blue-600 py-12 px-4 bg-slate-100 shadow-md rounded-xl text-center font-semibold text-2xl focus:border-none relative placeholder:font-normal"
      />
      <p>
        Available Balance:
        <span className="font-bold">
          <span className="font-black text-md font-signika"> ৳</span>1050.34
        </span>
      </p>
    </>
  );
};

export default AmountInput;
