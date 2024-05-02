import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase-auth.utils";
import {
  getUserDocument
} from "../../utils/firebase/firestore.utils";

import { LoadingFeedbackContext } from "../../contexts/loadingFeedback.context";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const { setIsLoading, setIsSuccessful } = useContext(LoadingFeedbackContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true)

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await getUserDocument(user, { displayName });
      resetFormFields();
    } catch (error) {
      setIsSuccessful(error.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-Parent">
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <span className="signInSpan">
          Already Have An Account? Sign In{" "}
          <Link to="/" className="signInLink">
            Here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
