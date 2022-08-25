// import { useState, FormEvent, ChangeEvent } from "react";
// import { useDispatch } from "react-redux/es/exports";

// import FormInput from "../form-input/form-input.component";
// import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

// import "./sign-in-form.styles.scss";

// const defaultFormFields = {
//   email: "",
//   password: "",
// };

// const SignInForm = () => {
//   const dispatch = useDispatch();
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const { email, password } = formFields;

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     console.log(value, name);

//     setFormFields({ ...formFields, [name]: value });
//   };

//   const resetFormFields = () => setFormFields(defaultFormFields);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       dispatch(emailSignInStart(email, password));

//       resetFormFields();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const logGoogleUser = async () => {
//     dispatch(googleSignInStart());
//   };

//   return (
//     <div className="sign-up-form-container">
//       <h2>Sign in</h2>
//       <span>Sign in with your email and password</span>

//       <form onSubmit={(e) => handleSubmit}>
//         <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />

//         <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />

//         <div className="buttons-container">
//           <Button type="submit">Sign in</Button>

//           <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={logGoogleUser}>
//             Sign in with Google
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignInForm;
