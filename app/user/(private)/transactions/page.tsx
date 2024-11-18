"use client";
import TransactionsSkeleton from "@/components/TransactionsSkeleton";
import { Card } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TransactionsTable from "../../../../components/TransactionsTable";

const Transactions = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => axiosSecure.get("/api/user/transactions"),
  });
  const transactions = data?.data?.result;

  return isLoading ? (
    <TransactionsSkeleton count={8} />
  ) : transactions?.length === 0 ? (
    <h1>No transactions found</h1>
  ) : (
    <Card className="max-w-2xl mx-auto font-signika rounded-none md:rounded-lg md:my-2">
      <div className="divide-y">
        <h1 className="text-center text-2xl font-semibold text-blue-600 my-2">
          Recent Transactions
        </h1>

        <TransactionsTable />
      </div>
    </Card>
  );
};
export default Transactions;
