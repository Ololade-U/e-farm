"use client";
import { ReactNode } from "react";
import { Provider } from "@/components/ui/provider";
import { SessionProvider } from "next-auth/react";

interface Prop {
  children: ReactNode;
}
const AuthProvider = ({ children }: Prop) => {
  return (
    <SessionProvider>
      <Provider>{children}</Provider>
    </SessionProvider>
  );
};

export default AuthProvider;
