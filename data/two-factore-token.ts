import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.towFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.towFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
