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
        <h2 className="text-xl font-semibold text-blue-600">Send Money</h2>

        <Label className="text-sm w-full" htmlFor="agentNo">
          Enter Receipt Number:
        </Label>
        <Input
          placeholder="Enter Number"
          className=""
          type="tel"
          id="agentNo"
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 ">
        <AmountInput />
        <Input
          type="password"
          placeholder="Enter PIN"
          className="text-center border-slate-300"
        />
        <Button
          size={"lg"}
          onClick={() => router.push("/user/confirm")}
          className="bg-blue-600 hover:bg-blue-700 w-full text-md "
        >
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default SendMoney;
