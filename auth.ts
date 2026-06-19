import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { ZodError } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      picture: string;
    } & DefaultSession["user"];
  }
  interface User {
    username?: string;
    picture?: string;
  }
}

const backendServer = process.env.BACKEND_SERVER;

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        if (account?.provider == "google" || account?.provider == "github") {
          try {
            const response = await fetch(`${backendServer}/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: account.providerAccountId,
                email: user.email,
                name: user.name,
                provider: account?.provider,
                picture: user.image,
              }),
            });

            if (!response.ok) {
              throw new Error(`Fetch error. ${response.statusText}`);
            }

            const backendUser = await response.json();

            token.id = backendUser.id;
            token.username = backendUser.username;
            token.picture = backendUser.picture;
          } catch (error) {
            console.error(error);
          }
        } else {
          token.id = user.id;
          token.username = user.username;
          token.picture = user.picture;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.picture = token.picture as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google,
    GitHub,
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
