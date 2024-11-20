"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  UserPlus,
  Users,
} from "lucide-react";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => axiosSecure.get("/api/admin/statistics"),
    staleTime: 0,
  });

  const response = data?.data[0];

  const statistics = [
    {
      title: "Total Users",
      value: `${response?.userCount.totalUsers}`,
      change: "+12%",
      icon: Users,
    },
    {
      title: "Total Agent",
      value: `${response?.agentCount[0].totalUser}`,
      change: "+18%",
      icon: UserPlus,
    },
    {
      title: "Total Transactions",
      value: `৳${response?.totalTransaction.toFixed(2)}`,
      change: "+8%",
      icon: CreditCard,
    },
    {
      title: "Revenue",
      value: `৳${response?.totalRevenue.toFixed(2)}`,
      change: "-3%",
      icon: DollarSign,
    },
  ];

  return (
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
              <div className="text-2xl font-bold">
                {isLoading ? <Skeleton className="h-6" /> : stat.value}
              </div>
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
  );
};

export default Statistics;
