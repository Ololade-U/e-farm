// next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// 1. Extend the built-in Session interface
declare module "next-auth" {
  interface Session {
    user: {
      // Add the custom properties you are passing in the session callback
      id: string;
      role: string;
    } & DefaultSession["user"]; // Keep the default properties (name, email, image)
  }
}

// 2. Extend the built-in JWT interface (optional, but good practice for full type safety)
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}