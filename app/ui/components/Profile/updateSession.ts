"use server";
import { User } from "@/app/lib/definitions";
import { auth, unstable_update } from "@/auth";

export async function updateSession(user: User) {
  const session = await auth();

  if (!session) return { error: "Unauthorized" };

  // Execute database logic here...

  // Force cookie session update on the server side
  await unstable_update({
    user: {
      username: user.username,
      picture: user.picture,
    },
  });
  console.log(session.user);
}
