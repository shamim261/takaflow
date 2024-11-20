import { ErrorMessage } from "@/types";
import { AxiosError } from "axios";

const getError = (error: AxiosError<ErrorMessage>): string | undefined => {
  return error?.response?.data.error;
};
export default getError;
