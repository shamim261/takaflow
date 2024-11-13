import isAuth from "@/utils/isAuth";
import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils/tokenUtils";

export async function middleware(req: NextRequest) {
  // Avoiding login and register paths
  const authPrefixes = ["/user/login", "/user/signup"];
  const { pathname } = req.nextUrl;
  if (authPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }
  const cookie = req.cookies.get(process.env.COOKIE_NAME!);
  const token: string | undefined = cookie ? cookie.value : undefined;

  if (token && isTokenExpired(token)) {
    return NextResponse.redirect(
      new URL(process.env.DEFAULT_LOGIN_PAGE!, req.url)
    );
  }

  const userInfo = await isAuth();

  if (!userInfo) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
