import { userInfoType } from "@/types";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookie = (await cookies()).get(process.env.COOKIE_NAME!);

  const token = cookie ? cookie.value : null;

  if (token) {
    try {
      const payload: userInfoType = decodeJwt(token);
      return payload;
    } catch (error) {
      console.log(error);
    }
  }
  // return null;
};
