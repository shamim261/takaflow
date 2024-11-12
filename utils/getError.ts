import { ErrorMessage } from "@/app/user/(auth)/signup/page";
import { AxiosError } from "axios";

const getError = (error: AxiosError<ErrorMessage>): string | undefined => {
  return error?.response?.data.error;
};
export default getError;
