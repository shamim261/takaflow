import { Card } from "@/components/ui/card";
import TransactionsTable from "../transactions/TransactionTable";
import Statistics from "./Statistics";

const Dashboard = () => {
  // Mock data for statistics

  return (
    <div className="max-w-md md:max-w-7xl mx-auto my-2">
      <Statistics />
      <div>
        <h2 className="text-2xl font-bold mb-4 text-blue-500">
          Recent Transactions
        </h2>
        <Card className="py-1">
          <TransactionsTable visible={5} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
