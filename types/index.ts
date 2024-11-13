import userLoginInput from "@/schemas/userLoginInput";
import { z } from "zod";

export interface ErrorMessage {
  error: string;
}

export type userLoginType = z.infer<typeof userLoginInput>;
