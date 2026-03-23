import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import type { NextAuthOptions } from "next-auth";

const providers = [];

// Only add Google provider when credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma) as any,

  providers,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          const dbUser = await prisma.user.upsert({
            where: { email: user.email! },
            update: {},
            create: {
              email: user.email!,
              name: user.name,
              image: user.image,
            },
          });
          token.id = dbUser.id;
        } catch (error) {
          console.error(
            "UPSERT ERROR DETAILS:",
            JSON.stringify(error, null, 2),
          );
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
