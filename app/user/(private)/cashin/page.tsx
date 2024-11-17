"use client";
import AmountInput from "@/components/AmountInput";
import ErrorComponent from "@/components/ErrorComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { cashInInput } from "@/schemas/actionSchema";
import { ErrorMessage } from "@/types";
import getError from "@/utils/getError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@radix-ui/themes";
import { AxiosError } from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CashIn = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<cashInType>({
    resolver: zodResolver(cashInInput),
  });
  const axiosSecure = useAxiosSecure();

  type cashInType = z.infer<typeof cashInInput>;
  const submitHandler = async (formData: cashInType) => {
    setIsSubmitting(true);
    setError("");
    try {
      const { data } = await axiosSecure.post("/api/user/cashin", {
        ...formData,
      });
      toast.success("Transaction Complete!");
      router.push("/user/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<ErrorMessage>;
        setError(getError(err));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-3 mx-2 my-4 md:max-w-md md:mx-auto">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col justify-center items-center space-y-2 ">
          <h2 className="text-xl font-semibold text-blue-600">
            Cash In Request
          </h2>

          <Label className="text-sm w-full" htmlFor="agentNo">
            Enter Agent Number:
          </Label>
          <Input
            required
            {...register("number")}
            placeholder="Enter Number"
            className=""
            type="number"
            id="agentNo"
          />
          <ErrorComponent error={errors?.number?.message} />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 ">
          <AmountInput {...register("amount")} />

          <ErrorComponent error={errors?.amount?.message} />
          <Input
            required
            {...register("pin")}
            type="password"
            placeholder="Enter PIN"
            className="text-center border-slate-300"
          />
          <ErrorComponent error={errors?.pin?.message} />

          <ErrorComponent error={error} />
          <Button
            disabled={isSubmitting}
            type="submit"
            size={"lg"}
            className="bg-blue-600 hover:bg-blue-700 w-full text-md "
          >
            {isSubmitting && <Spinner size={"3"} />} Cash In Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CashIn;
