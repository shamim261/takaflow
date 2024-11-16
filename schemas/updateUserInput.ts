import { z } from "zod";

const userLoginInput = z.object({
  name: z.string().min(1, "Field should not be empty!").optional(),
  email: z.string().min(1, "Field should not be empty!").optional(),
  newPin: z.string().optional(),
  pin: z.string().length(5, "PIN must be 5 digits!"),
});
export default userLoginInput;
