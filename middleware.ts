import isAuth from "@/utils/isAuth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Avoiding login and register paths
  const authPrefixes = ["/user/login", "/user/signup"];
  const { pathname } = req.nextUrl;
  if (authPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const userInfo = await isAuth();
  console.log(userInfo);

  if (!userInfo) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
