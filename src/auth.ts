import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

import { connectToDatabase } from "@/lib/db";
import clientPromise from "@/lib/db/mongo-client";
import { User, type UserRole } from "@/models/user";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_DB_NAME ?? "consultvault",
  }),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        await connectToDatabase();

        const user = await User.findOne({ email: parsed.data.email })
          .select("+passwordHash")
          .exec();

        if (!user?.passwordHash || !user.isActive) return null;

        const valid = await compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;

        user.lastLoginAt = new Date();
        await user.save();

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          image: user.image ?? undefined,
          role: user.role,
        };
      },
    }),
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "customer";
        return token;
      }

      // Keep role in sync when promoted via admin:promote
      if (token.id || token.email) {
        try {
          await connectToDatabase();
          const dbUser = token.id
            ? await User.findById(token.id).select("role email").lean()
            : null;
          const byEmail =
            dbUser ??
            (token.email
              ? await User.findOne({
                  email: String(token.email).toLowerCase(),
                })
                  .select("role")
                  .lean()
              : null);
          if (byEmail?.role) {
            token.role = byEmail.role as UserRole;
          }
        } catch {
          // Keep existing token role if DB lookup fails
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string | undefined) ?? token.sub ?? "";
        session.user.role = (token.role as UserRole | undefined) ?? "customer";
      }
      return session;
    },
  },
  trustHost: true,
});
