import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = req.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  //   matcher: "/about/:path*",
  matcher: ["/", "/login", "/signup", "/profile", "/verifyemail"],
};
