import { Card } from "@/components/ui/card";
import TransactionsTable from "./TransactionTable";

const Transactions = () => {
  return (
    <div className="py-2 max-w-sm sm:max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        All Transactions
      </h2>
      <Card className="py-1">
        {/* TODO: Design it for admin */}
        <TransactionsTable />
      </Card>
    </div>
  );
};

export default Transactions;
