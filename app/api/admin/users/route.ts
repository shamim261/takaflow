import User from "@/models/userModel";
import { getUser } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const userInfo = await getUser();
  if (!userInfo?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    await connectDB();
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "_id name phone email status role"
    );

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error!" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const { id, action } = await req.json();
  const userInfo = await getUser();
  if (!userInfo?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  }

  try {
    await connectDB();
    const data = await User.findByIdAndUpdate(
      id,
      { status: action },
      { new: true }
    );
    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
