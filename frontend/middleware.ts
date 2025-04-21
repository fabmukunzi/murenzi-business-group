import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TOKEN_NAME } from './lib/constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)
  const { pathname } = request.nextUrl;
  
  if (!token && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
} 