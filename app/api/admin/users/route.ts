import User from "@/models/userModel";
import { getUser } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const userInfo = await getUser();
  // if (userInfo?.role !== "admin") {
  //   return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  // }

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
