import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function customProxy(request: NextRequest) {
  const session = await auth();

  if (session?.user && request.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/"],
};
