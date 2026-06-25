import type { Metadata } from "next";
import { montserrat } from "./ui/fonts";
import "./globals.css";
import Navbar from "./ui/components/Navbar/Navbar";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "CodingLinguist",
  description:
    "CodingLinguist is a web-based programming language learning platform designed to make coding education more interactive and engaging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextTopLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
