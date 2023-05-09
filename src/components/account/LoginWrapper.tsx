import { useState } from "react";

import styles from "src/styles/components/account/LoginWrapper.module.css";

import LoginButton from "src/components/account/LoginButton";
import LoginForm from "src/components/account/LoginForm";
import GoogleLogin from "src/components/account/GoogleLogin";

const CurrentUser = ({ user }: { user: string }) => {
  return (
    <span className={`${styles.currentUserFont} ${styles.currentUserLyt}`}>
      Hi! {user}
    </span>
  );
};
const LoginWrapper = ({ user }: { user: string }) => {
  const [showHideLoginForm, setShowHideLoginForm] = useState(false);
  const handleLoginButton = () => {
    setShowHideLoginForm(showHideLoginForm => !showHideLoginForm);
  }
  const closeLoginForm = () => {
    setShowHideLoginForm(false);
  }
  return (
    <>
      <div className={`${styles.containerLyt}`}>
        {/* <CurrentUser user={user} /> */}
        {/* <LoginButton handleLoginButton={handleLoginButton}/> */}
        <GoogleLogin />
      </div>
      {showHideLoginForm ? <LoginForm closeLoginForm={closeLoginForm}/>: null}
    </>
  );
};

export default LoginWrapper;
