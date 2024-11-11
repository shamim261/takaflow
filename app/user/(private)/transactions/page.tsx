import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Transactions = () => {
  return (
    <div className="my-4 mx-2 md:max-w-xl md:mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">All Transactions</CardTitle>
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
                    <p className="font-medium">Cash Out {i}</p>
                    <p className="text-sm text-gray-500">2023-06-{10 + i}</p>
                  </div>
                </div>
                <span className="font-medium text-red-500">-$10{i}.00</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
