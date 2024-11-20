import isAuth from "@/utils/isAuth";
import { redirect } from "next/navigation";

const page = async () => {
  const isLoggedIn = await isAuth();

  if (!isLoggedIn) {
    redirect("admin/login");
  } else {
    redirect("admin/dashboard");
  }
  return <div>Hello World</div>;
};

export default page;
