import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GitHubProvider from "next-auth/providers/github";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            image: string
        }
    }
}

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!
        })
    ],
    callbacks: {
        async session({ session, user }: { session: Session, user: AdapterUser }) {
            if (session.user) {
                session.user.id = user.id;
            } else {
                console.error("Session user is undefined")
            }
            return session
        }
    }
}

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);