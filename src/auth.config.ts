import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
/*         authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }, */
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ token, session }) {
            session.user = token.data as any;
            return session;
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log('credentials raw:', credentials);

                const parsedCredentials = z
                    .object({ email: z.email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                const user = await prisma.user.findUnique({ where: { email: email } })
                console.log(email === user?.email)
                console.log(password === user?.password)
                if (!user) return null;
                if (!bcrypt.compareSync(password, user.password)) return null;

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...rest } = user;

                return rest;
            },
        }),
    ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);