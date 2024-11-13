import { cookies } from "next/headers";

const isAuth = async () => {
  const authToken = await cookies();

  const user = authToken.get(process.env.COOKIE_NAME!);
  if (user && user.value) {
    return true;
  }
  return null;
};

export default isAuth;
