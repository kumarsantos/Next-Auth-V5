import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  }, ///if we already login with same email and try google with same
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  }, //events will automatically verify the email , when social login used
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      //prevent signin without email verification, we can make check for specific provider email verificationn
      const existingUser = await getUserById(user?.id);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }
      //TODO 2FA check
      if (existingUser?.isTwoFactorEnable) {
        const twoFactorConfirmation = await getTwoFactorConfirmationUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) {
          return false;
        }

        ///Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, user, token }) {
      if (token?.sub && session?.user) {
        session.user.id = token?.sub;
      }
      if (token?.role && session?.user) {
        session.user.role = token.role as UserRole;
      }
      if (session?.user) {
        session.user.isTwoFactorEnable = token.isTwoFactorEnable as boolean;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token?.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;

      token.role = existingUser?.role;
      token.isTwoFactorEnable = existingUser?.isTwoFactorEnable;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
