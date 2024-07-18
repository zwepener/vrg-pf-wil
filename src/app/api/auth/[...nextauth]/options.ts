import { fetchUser } from "@/lib/data";
import { type User, RawUserSchema } from "@/lib/definitons";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const { success, data } = RawUserSchema.pick({
          username: true,
          password: true,
        }).safeParse(credentials);

        if (success) {
          const rawUser = await fetchUser(data.username);
          if (!rawUser) return null;
          const { password, ...user } = rawUser;
          const bcrypt = require("bcrypt");
          const passwordsMatch = await bcrypt.compare(data.password, password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
} satisfies NextAuthOptions;
