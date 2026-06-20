import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/editor"];
const adminPaths = ["/admin"];
const authPaths = ["/login", "/signup", "/forgot-password", "/verify-email"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session token (NextAuth.js cookie)
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthenticated = !!sessionToken;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect dashboard routes
  if (
    !isAuthenticated &&
    protectedPaths.some((p) => pathname.startsWith(p))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin routes (role check happens server-side)
  if (
    !isAuthenticated &&
    adminPaths.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // API rate limiting headers
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", "100");
    response.headers.set("X-RateLimit-Remaining", "99");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
    "/api/:path*",
  ],
};
