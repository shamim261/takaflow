"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BalanceButton = () => {
  const [trigger, setTrigger] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { data, status, error } = useQuery({
    queryKey: ["balance", trigger],
    queryFn: () => axiosSecure.get("/api/user/getbalance"),
    enabled: trigger,
    staleTime: 10,
  });

  const handleBalance = async () => {
    setTrigger(true);
  };
  return (
    <button
      onClick={handleBalance}
      className="flex justify-center items-center mt-2 mx-auto h-10 w-48 border-2 border-blue-600 rounded-full hover:bg-blue-600/10 transition-colors hover:text-slate-100 hover:cursor-pointer "
    >
      <h1 className="text-center font-semibold text-blue-600">
        {data?.data ? data?.data + " TK" : "Check Balance"}
      </h1>
    </button>
  );
};

export default BalanceButton;
