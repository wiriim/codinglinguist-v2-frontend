import { Progress } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

const backendServer = process.env.BACKEND_SERVER;

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ name: string; levelNumber: string }>;
}>) {
  const session = await auth();
  const { name: courseName, levelNumber } = await params;

  if (!session && parseInt(levelNumber) > 1) {
    redirect("/login");
  }

  const progress: Progress = await (
    await fetch(`${backendServer}/users/${session?.user.id}/progress`)
  ).json();

  if (
    courseName.includes("C") &&
    parseInt(levelNumber) > progress.cProgress.length + 1
  ) {
    redirect("/course/C");
  } else if (
    courseName.includes("Java") &&
    parseInt(levelNumber) > progress.javaProgress.length + 1
  ) {
    redirect("/course/Java");
  } else if (
    courseName.includes("Python") &&
    parseInt(levelNumber) > progress.pythonProgress.length + 1
  ) {
    redirect("/course/Python");
  }

  return <SessionProvider>{children}</SessionProvider>;
}
