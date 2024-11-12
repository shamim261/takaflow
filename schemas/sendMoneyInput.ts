import { z } from "zod";

const sendMoneyInput = z.object({
  number: z.string().length(11, "Enter a valid number!"),
  amount: z.number().min(10, "Minimum is 10 Taka!"),
  pin: z.number().min(1),
});

export default sendMoneyInput;
