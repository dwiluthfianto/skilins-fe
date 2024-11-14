import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/:path*/submit",
    "/:path*/create",
    "/:path*/add",
    "/:path*/update",
    "/account",
    "/settings/:path*",
  ],
};

export function middleware(request: NextRequest) {
  try {
    const requestURL = new URL(request.url);
    const referer = request.headers.get("referer");

    // Cek apakah referer ada dan berasal dari domain yang sama
    if (!referer || !referer.startsWith(requestURL.origin)) {
      throw new Error("Direct access detected");
    }
  } catch {
    // Redirect ke halaman lain jika akses langsung terdeteksi
    return NextResponse.redirect(new URL("/", request.url));
  }
}
