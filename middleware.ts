import { NextRequest, NextResponse } from "next/server";
import { GATE_COOKIE, GATE_VALUE } from "@/lib/gate";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname === "/gate" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images/") ||
    pathname === "/icon.png" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (request.cookies.get(GATE_COOKIE)?.value === GATE_VALUE) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/gate";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|images/).*)"],
};
