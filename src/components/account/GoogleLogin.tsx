import { useSession, signIn, signOut } from 'next-auth/react';

import styles from 'src/styles/components/account/GoogleLogin.module.css';

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <span className={`${styles.currentUserFont} ${styles.currentUserLyt}`}>
          Signed in as {session.user ? session.user.name : '_blank'}
        </span>
        <button className={styles.button} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <span className={`${styles.currentUserFont} ${styles.currentUserLyt}`}>
        Not signed in
      </span>
      <button className={styles.button} onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
