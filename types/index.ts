import { userLoginInput } from "@/schemas/userSchema";
import { z } from "zod";

export interface ErrorMessage {
  error: string;
}

export type userLoginType = z.infer<typeof userLoginInput>;

export interface userInfoType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "agent" | "admin";
  isAdmin: boolean;
  token: string;
}

export interface selectorStateType {
  user: { userInfo: userInfoType };
}

export interface Transaction {
  trxID: string;
  amount: number;
  fee: number;
  receiverId: string;
  receiverPhone: string;
  senderId: string;
  senderPhone: string;
  status: "rejected" | "pending" | "approved";
  type: "send_money" | "cash_in" | "cash_out";
  userSpecificType: string;
  _id: string;
  updatedAt: string;
}
