"use server";

import { User } from "@/app/lib/definitions";

const backendServer = process.env.BACKEND_SERVER;

export async function update(formData: FormData, user: User) {
  const profilePicture = formData.get("profilePicture") as File;
  const backgroundPicture = formData.get("backgroundPicture") as File;
  const response = await fetch(`${backendServer}/users/${user.id}`, {
    method: "PUT",
    body: (() => {
      const data = new FormData();

      const usernameValue = formData.get("username");
      const bioValue = formData.get("bio");

      data.append(
        "username",
        typeof usernameValue === "string" ? usernameValue : ""
      );
      data.append("bio", typeof bioValue === "string" ? bioValue : "");

      if (profilePicture && profilePicture.size > 0) {
        data.append("profile", profilePicture);
      }
      if (backgroundPicture && backgroundPicture.size > 0) {
        data.append("background", backgroundPicture);
      }

      data.append("email", user.email);
      data.append("picture", user.picture);
      data.append("background", user.background);
      return data;
    })(),
  });

  if (response.ok) {
    return {
      success: true,
      data: await response.json(),
      msg: response.statusText,
    };
  }
  return { success: false, data: null, msg: response.statusText };
}
