import { Skeleton } from "@radix-ui/themes";

interface TransactionsSkeletonProps {
  count: number;
}

const TransactionsSkeleton = ({ count }: TransactionsSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center py-4 px-4 hover:bg-muted/50"
        >
          <div className="mr-4">
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1"></div>
            <Skeleton className="h-10" />
          </div>
          <div className="text-right ml-4">
            {/* <Skeleton /> */}
            {/* <Skeleton /> */}
            {/* <ChevronRight className="w-5 h-5 text-muted-foreground inline-block" /> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default TransactionsSkeleton;
