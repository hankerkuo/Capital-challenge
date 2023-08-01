import { Session } from "next-auth"

const isAdministrator = (session: Session | null) => {
  const ADMIN_EMAIL = 'hankerkuo@gmail.com';
  if (session?.user?.email === ADMIN_EMAIL) {
    return true;
  }
  return false;
}

export { isAdministrator };