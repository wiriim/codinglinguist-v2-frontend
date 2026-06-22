import ProfileCard from "@/app/ui/components/Profile/ProfileCard";
import ProfileLinks from "@/app/ui/components/Profile/ProfileLinks";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import ProfileCardSkeleton from "@/app/ui/components/Profile/ProfileCardSkeleton";
import { Suspense } from "react";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}>) {
  let { username } = await params;
  username = decodeURIComponent(username);

  return (
    <SessionProvider>
      <div className="my-8 flex flex-col items-center">
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCard username={username} />
        </Suspense>
        <ProfileLinks username={username} />
        {children}
      </div>
    </SessionProvider>
  );
}
