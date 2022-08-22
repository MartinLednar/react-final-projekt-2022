import { useState, ChangeEvent, FormEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import "./sign-up-form.styles.scss";

import { useDispatch } from "react-redux/es/exports";
import { signUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        dispatch(signUpStart(email, password, displayName));

        resetFormFields();
      } catch (error) {
        if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
          alert("This mail is already being used!");
        }
      }
    } else {
      alert("Passwords dont match!");
      return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-form-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName} />

        <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />

        <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />

        <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
