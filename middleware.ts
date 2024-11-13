import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Avoiding login and register paths
  const authPrefixes = ["/user/login", "/user/signup"];
  const { pathname } = req.nextUrl;
  if (authPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const user = "m";

  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
