import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Label } from "./ui/label";

const AmountInput = (props: any) => {
  const axiosSecure = useAxiosSecure();

  const { data, error, status } = useQuery({
    queryKey: ["balance"],
    queryFn: () => axiosSecure.get("/api/user/getbalance"),
  });

  return (
    <>
      <Label htmlFor="amount" className="my-2">
        Amount
      </Label>
      <input
        required
        {...props}
        id="amount"
        placeholder="0"
        type="number"
        className=" text-blue-600 py-12 px-4 bg-slate-100 shadow-md rounded-xl text-center font-semibold text-2xl focus:border-none relative placeholder:font-normal"
      />
      <p className="justify-center items-center flex">
        Available Balance:
        {status === "pending" ? (
          <Skeleton className="mx-1 inline-block w-12 h-5" />
        ) : (
          <span className="font-bold">
            <span className="font-black text-md font-signika"> ৳</span>
            {data?.data}
          </span>
        )}
      </p>
    </>
  );
};

export default AmountInput;
