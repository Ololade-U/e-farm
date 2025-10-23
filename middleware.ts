// middleware.ts or middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const LOGIN_PATH = "/login";
const ROOT_PATH = "/";

export default withAuth(
  // The primary logic for redirection and role checking
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const userRole = token?.role;
    let DASHBOARD_PATH = "/";
    if (userRole === "FARMER") {
      DASHBOARD_PATH = "/home/farmer";
    } else if (userRole === "BUYER") {
      DASHBOARD_PATH = "/home/consumer";
    }

    if (token) {
      if (pathname === LOGIN_PATH) {
        return NextResponse.redirect(new URL(DASHBOARD_PATH, req.url));
      }
      if (pathname === ROOT_PATH) {
        return NextResponse.redirect(new URL(DASHBOARD_PATH, req.url));
      }

      if (
        (pathname.startsWith("/home/farmer") && userRole !== "FARMER") ||
        (pathname.startsWith("/home/consumer") && userRole !== "BUYER")
      ) {
        // Redirect them back to *their* correct dashboard
        return NextResponse.redirect(new URL(DASHBOARD_PATH, req.url));
      }
    }

    // B. For all other cases (unauthenticated or correct-role access), continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (
          req.nextUrl.pathname === LOGIN_PATH ||
          req.nextUrl.pathname === ROOT_PATH
        ) {
          return true;
        }

        return !!token;
      },
    },
    pages: {
      signIn: LOGIN_PATH,
    },
  }
);

export const config = {
  // Match the root, login page, and all /home paths for complete control
  matcher: [
    "/home",
    "/home/farmer",
    "/home/consumer",
    '/',
    '/login',
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$).*)",
  ],
};
