import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export async function auth() {
  return await getServerSession(authOptions);
}

// NextAuth returns a handler function for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
