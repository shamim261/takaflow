import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  UserPlus,
  Users,
} from "lucide-react";
import TransactionsTable from "../transactions/TransactionTable";

const Dashboard = () => {
  // Mock data for statistics
  const statistics = [
    { title: "Total Users", value: "10,483", change: "+12%", icon: Users },
    {
      title: "New Users (30 days)",
      value: "1,247",
      change: "+18%",
      icon: UserPlus,
    },
    {
      title: "Total Transactions",
      value: "$2.4M",
      change: "+8%",
      icon: CreditCard,
    },
    { title: "Revenue", value: "$87,345", change: "-3%", icon: DollarSign },
  ];

  return (
    <div className="max-w-md md:max-w-7xl mx-auto my-2">
      <div className="mb-6" id="statistics">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Statistics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change.startsWith("+") ? (
                    <ArrowUpRight className="inline h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="inline h-4 w-4" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
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
