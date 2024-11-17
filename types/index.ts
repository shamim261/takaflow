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
