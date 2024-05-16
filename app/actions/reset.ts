"use server";
import * as z from "zod";
import { ResetSchema } from "../schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validatedFieds = ResetSchema.safeParse(value);
  if (!validatedFieds?.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedFieds?.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email does not exists!" };
  }
  //send email for reset password
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
