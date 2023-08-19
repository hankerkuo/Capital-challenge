import { Session } from 'next-auth';
import { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

import SysConst from 'src/const/SysConst';

const isAdministrator = async (authTarget: Session | NextRequest | null) => {
  // TODO: make the admin user list in the database
  const ADMIN_EMAIL = 'hankerkuo@gmail.com';

  if (authTarget instanceof NextRequest) {
    const sessionCookie = authTarget.cookies.get(
      SysConst.NEXT_AUTH_SESSION_COOKIE_NAME
    );
    if (!sessionCookie) {
      return false;
    }
    const decodedToken = await decode({
      token: sessionCookie.value,
      secret: process.env.SECRET as string,
    });
    if (decodedToken?.email === ADMIN_EMAIL) {
      return true;
    }
  }

  if (
    !(authTarget instanceof NextRequest) &&
    authTarget?.user?.email === ADMIN_EMAIL
  ) {
    return true;
  }
  
  return false;
};

export { isAdministrator };
