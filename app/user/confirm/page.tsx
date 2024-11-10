import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Confirmation = () => {
  const num = "01650218863";
  return (
    <div className="my-2 mx-4 space-y-4 flex flex-col md:max-w-xl md:mx-auto md:space-y-6">
      <Card className="">
        <h1 className="my-1 mx-4 text-gray-500 font-medium text-xs">
          Recipient
        </h1>

        <p className="my-1 mx-4 font-medium text-gray-500">{num}</p>
      </Card>
      <Card className="flex justify-between items-center">
        <div>
          <p className="text-xs font-medium text-gray-500 my-1 mx-4">Amount</p>
          <p className="font-medium text-sm my-1 mx-4 ">
            <span className="font-black text-lg"> ৳</span>203.00
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 my-1 mx-4">Charge</p>
          <p className="font-medium text-sm my-1 mx-4 ">
            + <span className="font-black text-lg"> ৳</span>5.00
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 my-1 mx-4">Total</p>
          <p className="font-medium text-sm my-1 mx-4 ">
            <span className="font-black text-lg"> ৳</span>208.00
          </p>
        </div>
      </Card>
      <Input
        type="password"
        placeholder="Enter PIN"
        className="text-center border-slate-300"
      />
      <Button size={"lg"} className="bg-blue-600 hover:bg-blue-700">
        Send Money
      </Button>
    </div>
  );
};

export default Confirmation;
