import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import Logger from './utils/Logger';
import { isAdministrator } from './utils/auth/PrivilegeCheck';
import SysConst from './const/SysConst';

const isSessionValid = async (request: NextRequest) => {
  const sessionCookie = request.cookies.get(
    SysConst.NEXT_AUTH_SESSION_COOKIE_NAME
  );
  if (!sessionCookie) {
    return false;
  }
  return true;
};

export async function middleware(request: NextRequest) {
  // Check system env
  if (process.env.SECRET === undefined) {
    Logger.error(
      'Missing env variable SECRET, block all routes, please check .env file'
    );
    return NextResponse.redirect(new URL('/500', request.url));
  }

  // Check if the user is signed in
  if (!(await isSessionValid(request))) {
    Logger.log('[Middleware]', 'Block anonymous user');
    return NextResponse.rewrite(new URL('/403', request.url));
  }

  // Special case for different routes
  if (request.nextUrl.pathname.startsWith('/image-tagging')) {
    if (!(await isAdministrator(request))) {
      Logger.log('[Middleware] [/image-tagging]', 'Block non-admin user');
      return NextResponse.rewrite(new URL('/403', request.url));
    }
  }
}

export const config = {
  matcher: ['/image-tagging', '/api/image-tagging'],
};
