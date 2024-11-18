import isAuth from "@/utils/isAuth";
import { redirect } from "next/navigation";
import UserLoginForm from "./UserLoginForm";

const Login = async () => {
  const user = await isAuth();
  if (user) {
    redirect("/user/dashboard");
  }
  return (
    <div className="font-signika  my-4 md:max-w-xl md:mx-auto">
      <h1 className="text-center my-2 text-blue-600 font-bold text-3xl">
        AGENT LOGIN
      </h1>
      <UserLoginForm />
    </div>
  );
};

export default Login;
