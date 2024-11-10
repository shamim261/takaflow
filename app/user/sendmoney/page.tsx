"use client";
import AmountInput from "@/components/AmountInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
const SendMoney = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center space-y-3 mx-2 my-4 md:max-w-md md:mx-auto">
      <div className="flex flex-col justify-center items-center space-y-2 ">
        <Label className="text-md w-full" htmlFor="agentNo">
          Enter Receipt Number:
        </Label>
        <Input className="" type="tel" id="agentNo" />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 ">
        <Label id="amount">Amount</Label>
        <AmountInput />
        <Button
          onClick={() => router.push("/user/confirm")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default SendMoney;
