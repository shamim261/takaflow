import isAuth from "@/utils/isAuth";
import { redirect } from "next/navigation";

const page = async () => {
  const isLoggedIn = await isAuth();
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    redirect("/login");
  }
  return <div>helo</div>;
};

export default page;
