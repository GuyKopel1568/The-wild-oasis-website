import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  // אחרת המשך כרגיל
  return NextResponse.next();
}

export const config = {
  matcher: ['/account'], // הנתיב המוגן
};
