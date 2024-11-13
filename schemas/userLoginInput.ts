import { z } from "zod";

const userLoginInput = z.object({
  email: z.string().min(1, "Field should not be empty!"),
  pin: z.string().length(5, "PIN must be 5 digits!"),
});
export default userLoginInput;
