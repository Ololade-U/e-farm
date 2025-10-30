// middleware.ts or middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const LOGIN_PATH = "/login";
const ROOT_PATH = "/";
const REGISTER_PATH = "/register";
const FARMER_REGISTER_PATH = "/register/farmer";
const CONSUMER_REGISTER_PATH = "/register/consumer";

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
    } else if (token && !userRole) {
      DASHBOARD_PATH = REGISTER_PATH;
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
          req.nextUrl.pathname === ROOT_PATH ||
          req.nextUrl.pathname === REGISTER_PATH ||
          req.nextUrl.pathname === FARMER_REGISTER_PATH ||
          req.nextUrl.pathname === CONSUMER_REGISTER_PATH
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
    "/home/:path*",
    "/",
    "/login",
    "/register",
    "/register/farmer",
    "/register/consumer",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$).*)",
  ],
};
