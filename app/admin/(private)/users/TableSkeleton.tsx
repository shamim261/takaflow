import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@radix-ui/themes";
import { Search } from "lucide-react";

const TableSkeleton = () => {
  return (
    <div className="py-2 px-2">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">User Management</h2>
      <div className="mb-6" id="users">
        <Card className="mb-6">
          <CardContent>
            <div className="my-4">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                <Input
                  className="pl-8 w-full"
                  placeholder="Search users..."
                  type="search"
                />
              </form>
            </div>
            <div className="overflow-x-auto">
              <Table className="text-md">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 8 })?.map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TableSkeleton;
