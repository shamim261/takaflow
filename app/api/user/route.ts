import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  return NextResponse.json({
    message: "Test",
  });
}
