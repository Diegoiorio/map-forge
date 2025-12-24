import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let through: unlock page, static, next internals, favicon, etc.
  if (
    pathname.startsWith("/unlock") ||
    pathname.startsWith("/api/unlock") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml")
  ) {
    return NextResponse.next();
  }

  // If cookie present, ok
  const granted = req.cookies.get("access_granted")?.value === "1";
  if (granted) return NextResponse.next();

  // Otherwise redirect to /unlock
  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

// Applies to all routes except “classic” static files
export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
