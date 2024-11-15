import User from "@/models/userModel";
import { isValidToken } from "@/utils/tokenUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    const payload = await isValidToken(token!);
    if (payload) {
      const { balance } = await User.findOne({ _id: payload._id });
      return NextResponse.json(balance, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
