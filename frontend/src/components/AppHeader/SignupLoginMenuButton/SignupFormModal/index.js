import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import * as sessionActions from "../../../../store/session";

function SignupFormModal() {
  const [run, setRun] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(false);
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    let errs = [];
    if (showErr) setDisabled(true);
    if (password?.trim().length < 6 || password?.trim().length > 25)
      errs.push("Password needs to be between 6 and 25 characters");
    if (username?.trim().length < 4 || username?.trim().length > 25)
      errs.push("Username needs to be between 4 and 25 characters");
    if (email?.trim().length === 0) errs.push("Email is required");
    if (email?.trim().length > 25)
      errs.push("Email need to be no more than 25 characters");
    if (firstName?.trim().length === 0) errs.push("Firstname is required");
    if (firstName?.trim().length > 25)
      errs.push("Firstname need to be no more than 25 characters");
    if (lastName?.trim().length === 0) errs.push("Lastname is required");
    if (lastName?.trim().length > 25)
      errs.push("Lastname need to be no more than 25 characters");
    if (password !== confirmPassword)
      errs.push("Confirm password does not match the field for password.");

    if (showErr) {
      if (errs.length === 0) setDisabled(false);
      if (run === false) setRun(true);
      setErrors(errs);
    } else {
      if (errs.length === 0) setRun(true);
      else setRun(false);
    }
  }, [
    password,
    username,
    email,
    firstName,
    lastName,
    confirmPassword,
    showErr,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //if (password === confirmPassword) {
    setErrors([]);
    if (!showErr) setShowErr(true);

    if (run) {
      return dispatch(
        sessionActions.signup({
          email: email.trim(),
          username: username.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          password: password.trim(),
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
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
            type="email"
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
