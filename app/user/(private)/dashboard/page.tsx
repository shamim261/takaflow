import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Banknote, CirclePlus, ClipboardList, SendIcon } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col mt-1  bg-gray-100  dark:bg-gray-900">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 ">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Balance Card */}
          <div className="flex justify-center items-center mt-2 mx-auto h-10 w-48 border-2 border-blue-600 rounded-full hover:bg-blue-600/10 transition-colors hover:text-slate-100 hover:cursor-pointer ">
            <h1 className="text-center font-semibold text-blue-600">
              Check Balance
            </h1>
          </div>

          {/* Quick Actions */}
          <Card
            className="grid  grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-center 
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
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Transaction {i}</p>
                        <p className="text-sm text-gray-500">
                          2023-06-{10 + i}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">-$10{i}.00</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Sidebar (Desktop) */}
    </div>
  );
}

const cards = [
  {
    label: "Send Money",
    link: "/user/sendmoney",
    icon: (
      <SendIcon size="30" color="#2563eb" fontSize="large" className="my-2" />
    ),
  },
  {
    label: "Cash Out",
    link: "/user/cashout",
    icon: (
      <Banknote size="40" color="#2563eb" fontSize="large" className="my-1" />
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
