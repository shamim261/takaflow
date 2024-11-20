"use client";
import Pagination from "@/components/Pagination";
import TransactionsSkeleton from "@/components/TransactionsSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@/components/ui/avatar";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Transaction } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Store, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  visible?: number | undefined;
}

const TransactionsTable = ({ visible }: Props) => {
  const [globalError, setError] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => axiosSecure.get(`/api/agent/transactions?status=pending`),
    staleTime: 0,
  });
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItem = data?.data?.result.slice(firstItemIndex, lastItemIndex);

  let transactions;

  visible
    ? (transactions = data?.data?.result.slice(0, visible))
    : (transactions = data?.data?.result);

  const handleAction = async (id: string, action: string) => {
    try {
      const { data } = await axiosSecure.patch("/api/agent/transactions", {
        id,
        action,
      });
      toast.success("Transaction Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <>
      {isLoading ? (
        <TransactionsSkeleton count={4} />
      ) : transactions?.length === 0 ? (
        <p className="m-5 font-medium text-xl">No transactions found!</p>
      ) : (
        <>
          {currentItem?.map((transaction: Transaction) => (
            <div
              key={transaction._id}
              className="flex font-signika items-center py-4 px-4 hover:bg-muted/50"
            >
              <p>{error?.message}</p>
              <p>{globalError}</p>
              <div className="mr-4">
                {transaction.userSpecificType === "Cash Out" ? (
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-blue-500" />
                  </div>
                ) : (
                  <Avatar className="w-12 h-12 bg-blue-100 flex justify-center items-center">
                    <User
                      strokeWidth="2.5"
                      className="h-6 w-6 text-blue-500 "
                    />
                  </Avatar>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-medium text-foreground truncate">
                    {transaction.userSpecificType}
                  </h3>
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
                <div className="space-x-2">
                  {/* <Button
                    onClick={() => handleAction(transaction._id, "approve")}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleAction(transaction._id, "decline")}
                    className="bg-red-500"
                  >
                    Decline
                  </Button> */}

                  <AlertDialog>
                    <AlertDialogTrigger className="bg-blue-500 text-white px-3 py-0.5 rounded-md ">
                      Approve
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="">
                        <AlertDialogAction
                          className="my-2 sm:my-0"
                          onClick={() =>
                            handleAction(transaction._id, "approve")
                          }
                        >
                          Continue
                        </AlertDialogAction>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-red-500 text-white px-3 py-0.5 rounded-md ">
                      Decline
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="">
                        <AlertDialogAction
                          className="my-2 sm:my-0"
                          onClick={() =>
                            handleAction(transaction._id, "decline")
                          }
                        >
                          Continue
                        </AlertDialogAction>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
          {!visible && (
            <Pagination
              postsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPosts={data?.data?.result?.length}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </>
  );
};

export default TransactionsTable;
