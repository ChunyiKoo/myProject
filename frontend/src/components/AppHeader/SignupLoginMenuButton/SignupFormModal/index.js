import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import * as sessionActions from "../../../../store/session";
//import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(true);
    let errs = [];
    if (password.length < 6) errs.push("Password must be 6 or more characters");
    if (username.length < 4) errs.push("Username must be 4 or more characters");
    if (email.length === 0) errs.push("Email is required");
    if (firstName.length === 0) errs.push("Firstname is required");
    if (lastName.length === 0) errs.push("Lastname is required");
    if (password !== confirmPassword)
      errs.push("Confirm password does not match the field for password.");
    if (errs.length === 0) setDisabled(false);
    setErrors(errs);
  }, [password, username, email, firstName, lastName, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //if (password === confirmPassword) {
    //setErrors([]);
    return dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password,
      })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    //}
    // return setErrors([
    //   "Confirm Password field must be the same as the Password field",
    // ]);
  };

  const fillDemo = () => {
    setEmail("demo10@user.io");
    setUsername("marysmith");
    setFirstName("Mary");
    setLastName("Smith");
    setPassword("mypassword");
    setConfirmPassword("mypassword");
  };

  // useEffect(() => {
  //   let errs = [];
  //   if (credential.length < 4) errs.push("Name must be 3 or more characters");
  //   if (password.length < 6) errs.push("Password must be 6 or more characters");
  //   setErrors(errs);
  // }, [credential, password]);

  return (
    <div className="signup-form-container">
      <div>
        <h1>Sign Up</h1>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className="error-message" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* <p className="errors">
          {errors.filter((err) => err.includes("Email"))}
        </p> */}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {/* <p className="errors">
          {errors.filter((err) => err.includes("Firstname"))}
        </p> */}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {/* <p className="errors">
          {errors.filter((err) => err.includes("Lastname"))}
        </p> */}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* <p className="errors">
          {errors.filter((err) => err.includes("Password"))}
        </p> */}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {/* <p className="errors">
          {errors.filter((err) => err.includes("password"))}
        </p> */}
        <button
          disabled={disabled}
          className={
            !disabled
              ? "signup-form-submit-button"
              : "signup-form-submit-button disabled-button"
          }
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <div className="signup-demo-user" onClick={() => fillDemo()}>
        Demo User
      </div>
    </div>
  );
}

export default SignupFormModal;
