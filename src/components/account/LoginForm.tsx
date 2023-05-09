import { FormEvent, useContext, createContext } from "react";
import styles from "src/styles/components/account/LoginForm.module.css";

import { CurrentUserContext } from "src/pages/capital-challenge";

const LoginForm = ({closeLoginForm}: {closeLoginForm: () => void}) => {
  const {setUser} = useContext(CurrentUserContext);
  // Handles the submit event on form submit.
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> & {
      target: HTMLFormElement;
    }
  ) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      account: event.target.account.value,
      password: event.target.password.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/login";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    //TODO: handle UI when login failed
    setUser(result.user);
    closeLoginForm();
    // alert(`Is this your full name: ${result.user}`);
  };
  return (
    <div className={`${styles.containerLyt} ${styles.container}`}>
      <form className={`${styles.font}`} onSubmit={handleSubmit}>
        <label htmlFor="account">Account</label>
        <br />
        <input
          className={`${styles.loginInput}`}
          type="text"
          id="account"
          name="account"
          required
          minLength={3}
          maxLength={20}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className={`${styles.loginInput}`}
          type="text"
          id="password"
          name="password"
          required
          minLength={3}
          maxLength={20}
        />
        <br />
        <div className={`${styles.submitButtonWrapperLyt}`}>
          <input 
            className={`${styles.submitButtonLyt} ${styles.submitButton}`}
            type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
