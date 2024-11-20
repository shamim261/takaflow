import User, { IUser } from "@/models/userModel";
import connectDB from "@/utils/connectDB";
import { generateToken } from "@/utils/tokenUtils";
import brcypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
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

export async function PATCH(req: NextRequest) {
  try {
    const { _id, name, email, newPin, pin } = await req.json();
    if (!_id || (!name && !email && !newPin)) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
      });
    }
    await connectDB();
    const user = await User.findOne({ _id: _id });
    if (email && email !== user.email) {
      const existEmail = await User.findOne({ email: email });
      if (existEmail) {
        return NextResponse.json(
          { error: "Email already exist!" },
          { status: 400 }
        );
      }
    }
    const validUser = await brcypt.compare(pin, user.hashedPin);
    if (!validUser) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 400 });
    }

    const updates: {
      name?: string;
      email?: string;
      hashedPin?: string;
    } = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (newPin) {
      updates.hashedPin = await brcypt.hash(newPin, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updates, {
      new: true,
    });
    const token = await generateToken(user);
    const {
      _id: id,
      name: updatedName,
      email: updatedEmail,
      phone,
      role,
      isAdmin,
    } = updatedUser;
    let userObj = {
      id: _id,
      name: updatedName,
      email: updatedEmail,
      phone,
      role,
      isAdmin,
      token: token,
    };

    const response = NextResponse.json(userObj);

    response.cookies.set(process.env.COOKIE_NAME!, token!, {
      maxAge: 604800, // 7 days
      httpOnly: true,
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
