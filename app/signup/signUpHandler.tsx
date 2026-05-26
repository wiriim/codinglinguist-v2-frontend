"use server";

const backendServer = process.env.BACKEND_SERVER;

export async function handler(formData: FormData) {
  if (formData.get("password") != formData.get("passwordconf")) {
    return {
      success: false,
      msg: `${formData.get("password")} != ${formData.get("passwordconf")}`,
    };
  }
  const response = await fetch(`${backendServer}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  if (!response.ok) {
    return { success: false, msg: response.statusText };
  }
  return { success: true, msg: "User created" };
}
