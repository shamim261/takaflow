import { z } from "zod";
const phoneregex = new RegExp(/^01\d{9}$/);

export const addUserInput = z.object({
  name: z.string().min(1),
  phone: z
    .string()
    .length(11, "Phone number must be 11 digits!")
    .regex(phoneregex, "Invalid phone number!"),
  email: z.string().min(1).email("Must be an email!"),
  pin: z.string().length(5, "PIN must be 5 digits!"),
});

export const userLoginInput = z.object({
  email: z.string().min(1, "Field should not be empty!"),
  pin: z.string().length(5, "PIN must be 5 digits!"),
});

export const updateUserInput = z.object({
  name: z.string().min(1, "Field should not be empty!").optional(),
  email: z.string().min(1, "Field should not be empty!").optional(),
  newPin: z.string().optional(),
  pin: z.string().length(5, "PIN must be 5 digits!"),
});
