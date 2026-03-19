import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/leaderboard", "/learningPath", "/premium"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get("syntax-auth")?.value === "1";

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/leaderboard/:path*", "/learningPath/:path*", "/premium/:path*"],
};
