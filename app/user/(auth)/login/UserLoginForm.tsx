"use client";
import ErrorComponent from "@/components/ErrorComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import userLoginInput from "@/schemas/userLoginInput";
import { ErrorMessage, userLoginType } from "@/types";
import getError from "@/utils/getError";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const UserLoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginInput),
  });

  const submitHandler: SubmitHandler<userLoginType> = async (formData) => {
    setError("");
    try {
      const { data } = await axios.post("/api/user/login", {
        ...formData,
      });
      console.log("Logged In Successfully!");
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err as AxiosError<ErrorMessage>;
        setError(getError(error));
      }
    }
  };

  return (
    <form className="mx-2 space-y-4" onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-md">
          Email/Phone Number:
        </Label>
        <Input
          {...register("email")}
          className="h-14"
          type="text"
          id="email"
          placeholder="Email/Phone"
        />
        <ErrorComponent error={errors.email?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pin" className="text-md">
          PIN
        </Label>

        <Input
          className="h-14"
          type="password"
          id="pin"
          placeholder="PIN"
          {...register("pin")}
        />
        <ErrorComponent error={errors.pin?.message} />
        <ErrorComponent error={error} />
      </div>
      <Button type="submit" size={"lg"} className="w-full">
        Login
      </Button>
      <p className="text-center text-lg">
        New user?
        <Link href={"/user/signup"} className="text-blue-500 underline">
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
  );
};

export default UserLoginForm;
