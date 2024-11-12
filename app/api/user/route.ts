import User, { IUser } from "@/models/userModel";
import connectDB from "@/utils/connectDB";
import brcypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const { name, phone, email, pin } = await req.json();

  try {
    await connectDB();
    // check the already registered phone number
    const isPhoneExist = await User.findOne({ phone });
    if (isPhoneExist) {
      return NextResponse.json(
        { error: "Phone number already exist!" },
        { status: 400 }
      );
    }
    // check the already registered email
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return NextResponse.json(
        { error: "Email already exist!" },
        { status: 400 }
      );
    }
    const hashedPin = await brcypt.hash(pin, 10);

    const user: HydratedDocument<IUser> = new User({
      name,
      phone,
      email,
      hashedPin,
    });
    await user.save();
    return NextResponse.json(
      {
        message: "successfully saved!",
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        error: "Internal Server Error!",
      },
      { status: 500 }
    );
  }
}
