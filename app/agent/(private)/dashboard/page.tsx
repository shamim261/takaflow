import { Card, CardHeader } from "@/components/ui/card";

import { CirclePlus, ClipboardList } from "lucide-react";
import Link from "next/link";
import TransactionsTable from "../../../../components/TransactionsTable";
import BalanceButton from "./BalanceButton";

export default function Dashboard() {
  return (
    <div className="flex flex-col mt-1  bg-gray-100  dark:bg-gray-900">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 ">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Balance Card */}
          <BalanceButton />

          {/* Quick Actions */}
          <Card
            className="grid  grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-center 
          "
          >
            {cards?.map((c) => (
              <Link href={`${c.link}`} key={c.label}>
                <div className="my-2 flex flex-col justify-center items-center h-20 hover:cursor-pointer ">
                  {c.icon}
                  <p className="font-medium">{c.label}</p>
                </div>
              </Link>
            ))}
          </Card>

          {/* Recent Transactions */}
          <Card className="!font-signika">
            <CardHeader className="font-semibold">
              <div className="flex justify-between ">
                <p className="text-xl">Recent Transactions</p>
                <Link
                  href="/user/transactions"
                  className="text-blue-600 underline"
                >
                  See more..
                </Link>
              </div>
            </CardHeader>
            <TransactionsTable visible={4} />
          </Card>
        </div>
      </main>

      {/* Sidebar (Desktop) */}
    </div>
  );
}

const cards = [
  {
    label: "Pending Transactions",
    link: "/agent/pendingtransactions",
    icon: (
      <ClipboardList
        size="35"
        color="#2563eb"
        fontSize="large"
        className="my-1"
      />
    ),
  },

  {
    label: "Cash In",
    link: "/user/cashin",
    icon: (
      <CirclePlus size="35" color="#2563eb" fontSize="large" className="my-1" />
    ),
  },
  {
    label: "Transaction History",
    link: "/user/transactions",
    icon: (
      <ClipboardList
        size="35"
        color="#2563eb"
        fontSize="large"
        className="my-1"
      />
    ),
  },
];
