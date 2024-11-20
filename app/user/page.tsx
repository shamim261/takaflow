import isAuth from "@/utils/isAuth";
import { redirect } from "next/navigation";

const page = async () => {
  const isLoggedIn = await isAuth();

  if (!isLoggedIn) {
    redirect("user/login");
  } else {
    redirect("user/dashboard");
  }
  return <div>Hello World</div>;
};

export default page;
