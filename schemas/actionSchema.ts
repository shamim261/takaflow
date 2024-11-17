import { z } from "zod";

export const sendMoneyInput = z.object({
  number: z.string().length(11, "Enter a valid number!"),
  amount: z
    .string()
    .min(1, "Minimum is 10 Taka")
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format" }),
  pin: z.string().min(1, "Please enter PIN"),
});

export const cashInInput = z.object({
  number: z.string().length(11, "Enter a valid number!"),
  amount: z.string().min(1, "Minimum is 50 Taka"),
  pin: z.string().min(1, "Please enter PIN"),
});

export const cashoutInput = z.object({
  number: z.string().length(11, "Enter a valid number!"),
  amount: z.string().min(1, "Minimum is 50 Taka"),
  pin: z.string().min(1, "Please enter PIN"),
});
