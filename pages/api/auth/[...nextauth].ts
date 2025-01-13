import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const AUTH_OPTIONS = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: 'zwel',
  callbacks: {
    async jwt({ token, trigger, session }): Promise<any> {
      if (trigger === 'update') {
        return { ...token, ...session };
      }
      return token;
    },
    async session({ token }): Promise<any> {
      const userInfo = {
        _id: token?.sub!,
        _type: 'user',
        userName: token?.name!,
        image: token?.picture!,
      };

      if (token?.role) {
        userInfo.role = token.role;
      }
      return userInfo;
    },
  },
} satisfies NextAuthOptions;

export default NextAuth(AUTH_OPTIONS);
