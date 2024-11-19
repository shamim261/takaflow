import TransactionsTable from "@/components/TransactionsTable";
import { Card } from "@/components/ui/card";

const Transactions = () => {
  return (
    <div className="py-2">
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
