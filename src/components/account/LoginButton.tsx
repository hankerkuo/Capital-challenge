import { Dispatch, SetStateAction } from "react";
import styles from "src/styles/components/account/LoginButton.module.css";

const LoginButton = (props: { handleLoginButton: () => void }) => {
  return (
    <div className={`${styles.containerLyt}`}>
      <button
        onClick={props.handleLoginButton}
        className={`${styles.loginButton}`}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
