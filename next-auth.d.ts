import NextAuth from "next-auth";
import { User as CustomUser } from "@/types/common";

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
