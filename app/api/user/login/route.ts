import User from "@/models/userModel";
import userLoginInput from "@/schemas/userLoginInput";
import { userLoginType } from "@/types";
import connectDB from "@/utils/connectDB";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, pin }: userLoginType = await req.json();
  // data validation
  const validationResult = userLoginInput.safeParse({ email, pin });
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error?.format() },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
    });
    if (user) {
      const isMatch = await bcrypt.compare(pin, user.hashedPin);

      if (isMatch) {
        console.log("Logged In successfully!");
        // TODO: JWT logic
        return NextResponse.json(user);
      } else {
        return NextResponse.json(
          { error: "Invalid username or password" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 400 }
      );
    }
  } catch (e) {
    console.log(e);
  }
}
