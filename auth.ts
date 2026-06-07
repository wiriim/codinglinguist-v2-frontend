import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      point: number;
      picture: string;
    } & DefaultSession["user"];
  }
  interface User {
    username?: string;
    point?: number;
    picture?: string;
  }
}

const backendServer = process.env.BACKEND_SERVER;

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.point = user.point;
        token.username = user.username;
        token.picture = user.picture;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.point = token.point as number;
      session.user.picture = token.picture as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
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
