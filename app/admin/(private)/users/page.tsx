"use client";
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
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const client = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => axiosSecure.get("/api/admin/users"),
  });
  const users = data?.data;

  const [searchQuery, setSearchQuery] = useState<string | undefined>("");
  const filteredUsers = useMemo(() => {
    return users?.filter(
      (user: User) =>
        user.name.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
        user.email.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
        user.phone.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    );
  }, [users, searchQuery]);

  function capitalize(str: string) {
    if (!str) return str; // Check for empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const updateStatus = async (id: string, action: string) => {
    console.log("trigered");

    try {
      const data = await axiosSecure.patch("/api/admin/users", {
        id,
        action,
      });
      toast.success("Updated Successfully!");
      client.invalidateQueries({ queryKey: ["users"] });
      // router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  {filteredUsers?.map((user: User) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{capitalize(user.role)}</TableCell>
                      <TableCell>{capitalize(user.status)}</TableCell>
                      <TableCell>
                        <select
                          className="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          defaultValue={user.status}
                          onChange={(e) =>
                            updateStatus(user._id, e.target.value)
                          }
                        >
                          <option value="active">Approve</option>
                          <option value="pending">Pending</option>
                          <option value="blocked">Block</option>
                        </select>
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

export default Users;
