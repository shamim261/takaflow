"use client";

import ErrorComponent from "@/components/ErrorComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { login } from "@/redux/slices/userSlice";
import { updateUserInput } from "@/schemas/userSchema";
import { ErrorMessage, selectorStateType } from "@/types";
import getError from "@/utils/getError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@radix-ui/themes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

export default function ProfileForm() {
  const { userInfo } = useSelector((state: selectorStateType) => state.user);
  const dispatch = useDispatch();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean | undefined>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateUserInputType>({
    resolver: zodResolver(updateUserInput),
  });

  type updateUserInputType = z.infer<typeof updateUserInput>;

  const submitHandler: SubmitHandler<updateUserInputType> = async (
    formData
  ) => {
    setIsSubmitting(true);
    // Here you would typically send the data to your backend
    try {
      const { data } = await axiosSecure.patch("/api/user/", {
        ...formData,
        _id: userInfo._id,
      });
      dispatch(login(data));

      toast.success("Information Updated");
      router.push("/user/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err as AxiosError<ErrorMessage>;
        setError(getError(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm md:max-w-2xl my-4 mx-auto">
      <CardHeader>
        <CardTitle>Edit User Information</CardTitle>
        <CardDescription>Update your personal details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                defaultValue={userInfo?.name}
                id="name"
                {...register("name")}
                required
              />
              <ErrorComponent error={errors.name?.message} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue={userInfo?.email}
                id="email"
                type="email"
                {...register("email")}
                required
              />
              <ErrorComponent error={errors.name?.message} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                defaultValue={userInfo?.phone}
                id="phoneNumber"
                type="tel"
                disabled
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newPin">New PIN</Label>
              <Input
                id="newPin"
                type="password"
                {...register("newPin")}
                maxLength={5}
              />
              <ErrorComponent error={errors.newPin?.message} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pin">Current PIN</Label>
              <Input
                id="pin"
                type="password"
                {...register("pin", { required: true })}
                required
                maxLength={5}
              />
              <ErrorComponent error={errors.pin?.message} />
            </div>
            <ErrorComponent error={error} />
          </div>
          <CardFooter className="flex justify-center  mt-6 px-0">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isSubmitting && <Spinner size={"3"} />} Update Information
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
