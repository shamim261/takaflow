"use client";
import ErrorComponent from "@/components/ErrorComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/redux/slices/userSlice";
import { userLoginInput } from "@/schemas/userSchema";
import { ErrorMessage, userLoginType } from "@/types";
import getError from "@/utils/getError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const UserLoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginInput),
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const submitHandler: SubmitHandler<userLoginType> = async (formData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const { data } = await axios.post("/api/agent/login", {
        ...formData,
      });

      if (data.status === "pending") {
        setError("Your account is still pending!");
      }
      let userObject = {
        _id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        isAdmin: data.isAdmin,
        token: data.token,
      };
      dispatch(login({ ...userObject }));
      router.push("/agent/dashboard");
      toast.success("logged in");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const error = err as AxiosError<ErrorMessage>;
        setError(getError(error));
      }
    } finally {
      setIsSubmitting(false);
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
      <Button
        disabled={isSubmitting}
        type="submit"
        size={"lg"}
        className="w-full"
      >
        {isSubmitting && <Spinner size="3" />} Login
      </Button>
      <p className="text-center text-lg">
        New agent?
        <Link href={"/agent/signup"} className="text-blue-500 underline">
          {" "}
          Register Here
        </Link>
      </p>
      <hr className="border-3 border-slate-300" />
      <div className="text-center">
        <Link
          href={"/user/signup"}
          className="text-center text-lg text-blue-500 underline"
        >
          Register for an User Account
        </Link>
      </div>
    </form>
  );
};

export default UserLoginForm;
