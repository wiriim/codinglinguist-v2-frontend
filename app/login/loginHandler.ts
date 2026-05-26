"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function handler(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });

    return false;
  } catch (error) {
    if (error instanceof AuthError) {
      return true;
    }
    throw error;
  }
}
