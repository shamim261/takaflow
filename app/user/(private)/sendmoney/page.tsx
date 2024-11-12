"use client";
import AmountInput from "@/components/AmountInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import sendMoneyInput from "@/schemas/sendMoneyInput";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SendMoney = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<sendMoneyType>();

  // interface sendMoneyType {
  //   number: number;
  //   amount: number;
  //   pin: number;
  // }

  type sendMoneyType = z.infer<typeof sendMoneyInput>;
  const submitHandler = (data: sendMoneyType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center space-y-3 mx-2 my-4 md:max-w-md md:mx-auto">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col justify-center items-center space-y-2 ">
          <h2 className="text-xl font-semibold text-blue-600">Send Money</h2>

          <Label className="text-sm w-full" htmlFor="agentNo">
            Enter Receipt Number:
          </Label>
          <Input
            required
            {...register("number")}
            placeholder="Enter Number"
            className=""
            type="number"
            id="agentNo"
          />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 ">
          <AmountInput {...register("amount")} />
          <Input
            required
            {...register("pin")}
            type="password"
            placeholder="Enter PIN"
            className="text-center border-slate-300"
          />
          <Button
            type="submit"
            size={"lg"}
            className="bg-blue-600 hover:bg-blue-700 w-full text-md "
          >
            Send Money
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMoney;
