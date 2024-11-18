import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = new NextResponse("Logged Out Successfully!");
    response.cookies.delete(process.env.COOKIE_NAME!);
    return response;
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
