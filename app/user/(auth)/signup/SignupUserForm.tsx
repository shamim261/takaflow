"use client";
import ErrorComponent from "@/components/ErrorComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addUserInput from "@/schemas/addUserInput";
import { ErrorMessage } from "@/types";
import getError from "@/utils/getError";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { z } from "zod";

interface Message {
  message: string;
}

const SignupUserForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addUserInfer>({
    resolver: zodResolver(addUserInput),
  });

  const router = useRouter();
  type addUserInfer = z.infer<typeof addUserInput>;

  const submitHandler: SubmitHandler<addUserInfer> = (formData) => {
    setError("");
    async function postData() {
      try {
        const { data } = await axios.post<Message | ErrorMessage>("/api/user", {
          ...formData,
        });
        toast.success("Account created! Wait for approval");
        router.push("/user/dashboard");
      } catch (err) {
        if (err instanceof AxiosError) {
          const error = err as AxiosError<ErrorMessage>;
          setError(getError(error));
        }
      }
    }
    postData();
  };

  return (
    <form className="mx-2 space-y-4" onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-md">
          Name:
        </Label>
        <Input
          {...register("name")}
          className="h-14"
          type="text"
          id="name"
          placeholder="Enter your name"
        />
        <ErrorComponent error={errors?.name?.message || ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-md">
          Email:
        </Label>
        <Input
          {...register("email")}
          className="h-14"
          type="text"
          id="email"
          placeholder="Enter Your Email"
        />
        <ErrorComponent error={errors?.email?.message || ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-md">
          Phone Number:
        </Label>
        <Input
          {...register("phone")}
          className="h-14"
          type="number"
          id="phone"
          placeholder="Enter your phone number"
        />
        <ErrorComponent error={errors?.phone?.message || ""} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pin" className="text-md">
          PIN
        </Label>
        <Input
          {...register("pin")}
          className="h-14"
          type="password"
          id="pin"
          placeholder="Choose a 5 Digit PIN"
        />
      </div>
      <ErrorComponent error={errors?.pin?.message || ""} />
      <ErrorComponent error={error || ""} />
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
  );
};

export default SignupUserForm;
