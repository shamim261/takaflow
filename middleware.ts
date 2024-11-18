import isAuth from "@/utils/isAuth";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./utils/tokenUtils";

export async function middleware(req: NextRequest) {
  // Avoiding login and register paths
  const authPrefixes = [
    "/user/login",
    "/user/signup",
    "/agent/login",
    "/agent/signup",
  ];
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

  const isLoggedIn = await isAuth();

  if (isLoggedIn) {
    var { role } = decodeJwt(token!);
  }
  // Prevent redirect loops by checking the current path
  if (!isLoggedIn && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (role === "user" && pathname !== "/user/dashboard") {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }
  if (role === "agent" && pathname !== "/agent/dashboard") {
    return NextResponse.redirect(new URL("/agent/dashboard", req.url));
  }
  if (role === "admin" && pathname !== "/admin/") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/agent/:path*"],
};
