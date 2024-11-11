import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Login = () => {
  return (
    <div className="font-signika  my-4 md:max-w-xl md:mx-auto">
      <h1 className="text-center my-2 text-blue-600 font-bold text-3xl">
        LOGIN
      </h1>
      <form className="mx-2 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-md">
            Email/Phone Number:{" "}
          </Label>
          <Input
            className="h-14"
            type="text"
            id="email"
            placeholder="Email/Phone"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pin" className="text-md">
            PIN
          </Label>
          <Input className="h-14" type="password" id="pin" placeholder="PIN" />
        </div>
        <Button size={"lg"} className="w-full">
          Login
        </Button>
        <p className="text-center text-lg">
          New user?
          <Link href={"/user/register"} className="text-blue-500 underline">
            {" "}
            Register Here
          </Link>
        </p>
        <hr className="border-3 border-slate-300" />
        <div className="text-center">
          <Link
            href={"/user/register"}
            className="text-center text-lg text-blue-500 underline"
          >
            Register for an Agent Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
