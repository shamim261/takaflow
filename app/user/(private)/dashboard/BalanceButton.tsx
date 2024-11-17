"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Spinner } from "@radix-ui/themes";
import { useState } from "react";

const BalanceButton = () => {
  const [balance, setBalance] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  const axiosSecure = useAxiosSecure();
  // const { data, status, error } = useQuery({
  //   queryKey: ["balance", trigger],
  //   queryFn: () => axiosSecure.get("/api/user/getbalance"),
  //   enabled: trigger,
  //   staleTime: 0,
  // });

  const handleBalance = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosSecure.get("/api/user/getbalance");
      setBalance(data);
    } catch (error) {
      console.log(error);
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={handleBalance}
      className="flex justify-center items-center mt-2 mx-auto h-10 w-48 border-2 border-blue-600 rounded-full hover:bg-blue-600/10 transition-colors hover:text-slate-100 hover:cursor-pointer "
    >
      <h1 className="text-center font-semibold text-blue-600">
        {isLoading ? (
          <Spinner />
        ) : balance ? (
          balance.toFixed(2) + " TK"
        ) : (
          "Check Balance"
        )}
      </h1>
    </button>
  );
};

export default BalanceButton;
