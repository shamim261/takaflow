import isAuth from "@/utils/isAuth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import SignupUserForm from "./SignupUserForm";

const Signup = async () => {
  const user = await isAuth();
  if (user) {
    redirect("/user/dashboard");
  }
  return (
    <div className="font-signika  my-4 md:max-w-xl md:mx-auto">
      <Toaster />
      <h1 className="text-center my-2 text-blue-600 font-bold text-3xl">
        USER REGISTRATION
      </h1>
      <SignupUserForm />
    </div>
  );
};

export default Signup;
