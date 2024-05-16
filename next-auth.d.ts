import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnable: boolean;
  isOAuth: boolean;
  // id:string;//this or all other custom field which we add into session dynamically from token or anywhere else
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
