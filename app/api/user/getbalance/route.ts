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
      return NextResponse.json(balance);
    } else {
      return NextResponse.json({ error: "Invalid Token" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
