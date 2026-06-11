import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function customProxy(request: NextRequest) {
  const session = await auth();

  const pathname = request.nextUrl.pathname;

  if (
    session?.user &&
    (pathname === "/" || pathname === "/login" || pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session?.user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};
