import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="font-signika  my-4 md:max-w-xl md:mx-auto">
      <h1 className="text-center my-2 text-blue-600 font-bold text-3xl">
        REGISTRATION
      </h1>
      <form className="mx-2 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-md">
            Name:
          </Label>
          <Input
            className="h-14"
            type="text"
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-md">
            Email:
          </Label>
          <Input
            className="h-14"
            type="text"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-md">
            Phone Number:
          </Label>
          <Input
            className="h-14"
            type="phone"
            id="email"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pin" className="text-md">
            PIN
          </Label>
          <Input
            className="h-14"
            type="password"
            id="pin"
            placeholder="Choose a 5 Digit PIN"
          />
        </div>
        <Button type="submit" size={"lg"} className="w-full">
          Submit
        </Button>
        <p className="text-center text-lg">
          Already Registered?
          <Link href={"/user/login"} className="text-blue-500 underline">
            {" "}
            Register Here
          </Link>
        </p>
        <hr className="border-3 border-slate-300" />
        <div className="text-center">
          <Link
            href={"/agent/signup"}
            className="text-center text-lg text-blue-500 underline"
          >
            Register for an Agent Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
