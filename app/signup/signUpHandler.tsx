"use server";

const backendServer = process.env.BACKEND_SERVER;

export async function handler(formData: FormData) {
  if (formData.get("password") != formData.get("passwordconf")) {
    return {
      success: false,
      msg: "Passwords didn't match",
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
    if (response.status == 400) {
      const result = await response.json();
      return { success: false, msg: result };
    }
    return { success: false, msg: response.statusText };
  }
  return { success: true, msg: "User created" };
}
