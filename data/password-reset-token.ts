import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};
