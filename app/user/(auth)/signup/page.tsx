import { Toaster } from "react-hot-toast";
import SignupUserForm from "./SignupUserForm";

const Signup = () => {
  return (
    <div className="font-signika  my-4 md:max-w-xl md:mx-auto">
      <Toaster />
      <h1 className="text-center my-2 text-blue-600 font-bold text-3xl">
        REGISTRATION
      </h1>
      <SignupUserForm />
    </div>
  );
};

export default Signup;
