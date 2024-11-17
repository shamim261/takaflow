"use client";
import { Avatar } from "@/components/ui/avatar";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Badge } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Store, User } from "lucide-react";

const Transactions = () => {
  const axiosSecure = useAxiosSecure();
  const { data, status } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => axiosSecure.get("/api/user/transactions"),
  });
  const transactions = data?.data?.result;

  return status === "pending" ? (
    "Loading..."
  ) : (
    <div className="max-w-4xl mx-auto font-signika my-3">
      <div className="divide-y">
        <h1 className="text-center text-2xl font-semibold text-blue-600 my-2">
          Recent Transactions
        </h1>
        {/* TODO: Fix ts error  */}
        {transactions?.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center py-4 px-4 hover:bg-muted/50"
          >
            <div className="mr-4">
              {transaction.userSpecificType === "Cash Out" ? (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Store className="w-6 h-6 text-blue-500" />
                </div>
              ) : (
                <Avatar className="w-12 h-12 bg-blue-100 flex justify-center items-center">
                  <User strokeWidth="2.5" className="h-6 w-6 text-blue-500 " />
                </Avatar>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-medium text-foreground truncate">
                  {transaction.userSpecificType}
                </h3>
                <Badge
                  // variant={
                  //   transaction.status === "completed" ? "success" : "warning"
                  // }
                  color={
                    transaction.status === "rejected"
                      ? "red"
                      : transaction.status === "approved"
                      ? "green"
                      : undefined
                  }
                  className="ml-2"
                >
                  {transaction.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {transaction.userSpecificType === "Cash Out" || "Sent Money"
                  ? transaction.receiverPhone
                  : transaction.senderPhone}
              </p>
            </div>
            <div className="text-right ml-4">
              <p
                className={`text-base font-medium ${
                  transaction.status === "rejected" ||
                  transaction.userSpecificType === "Received Money" ||
                  transaction.userSpecificType === "Cash In"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.status === "rejected" ||
                transaction.userSpecificType === "Received Money" ||
                transaction.userSpecificType === "Cash In"
                  ? "+"
                  : "-"}{" "}
                ৳{transaction.amount.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(transaction.updatedAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // Set to true for 12-hour format
                  second: undefined, // Exclude seconds
                })}
              </p>
              {/* <ChevronRight className="w-5 h-5 text-muted-foreground inline-block" /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Transactions;
