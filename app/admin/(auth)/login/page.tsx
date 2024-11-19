import UserLoginForm from "./UserLoginForm";

const Login = async () => {
  return (
    <div className="font-signika  my-4 md:max-w-xl md:mx-auto">
      <h1 className="text-center my-2 text-blue-600 font-bold text-3xl">
        ADMIN LOGIN
      </h1>
      <UserLoginForm />
    </div>
  );
};

export default Login;
