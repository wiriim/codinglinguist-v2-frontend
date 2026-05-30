import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PassThrough } from "stream";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import { JWT } from "next-auth/jwt";
import { User } from "./app/lib/definitions";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      point: number;
    } & DefaultSession["user"];
  }
  interface User {
    username?: string;
    point?: number;
  }
}

const backendServer = process.env.BACKEND_SERVER;

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.point = user.point;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.point = token.point as number;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          let user = null;
          // const { email, password } = await signInSchema.parseAsync(
          //   credentials
          // );
          // console.log("authorizing...");
          // console.log(email, password);

          // logic to salt and hash password
          // const pwHash = saltAndHashPassword(credentials.password);

          const response = await fetch(`${backendServer}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            throw new Error("Fetch error.");
          }

          user = await response.json();
          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
});
