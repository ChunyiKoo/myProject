// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";

function LoginFormModal() {
 const [run, setRun] = useState(false);
 const dispatch = useDispatch();
 const [credential, setCredential] = useState("");
 const [password, setPassword] = useState("");
 const [errors, setErrors] = useState([]);
 const { closeModal, setOnModalClose } = useModal();
 const [disabled, setDisabled] = useState(false);
 const [showErr, setShowErr] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();
  setErrors([]);
  if (!showErr) setShowErr(true);

  if (run) {
   return dispatch(
    sessionActions.login({
     credential: credential.trim(),
     password: password.trim(),
    })
   )
    .then(() => {
     setOnModalClose(() => {
      setCredential("");
      setPassword("");
      setErrors([]);
     });
     closeModal();
    })
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) setErrors(data.errors);
    });
  }
 };

 const fillDemo1 = () => {
  // setCredential("demo@user.io");
  // setPassword("password");

  return dispatch(
   sessionActions.login({
    credential: "demo@user.io",
    password: "password",
   })
  )
   .then(() => {
    setOnModalClose(() => {
     setCredential("");
     setPassword("");
     setErrors([]);
    });
    closeModal();
   })
   .catch(async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
   });
 };

 // const fillDemo2 = () => {
 //   setCredential("user1@user.io");
 //   setPassword("password1");
 // };

 // const fillDemo3 = () => {
 //   setCredential("user2@user.io");
 //   setPassword("password2");
 // };

 useEffect(() => {
  let errs = [];
  if (showErr) setDisabled(true);
  if (credential?.trim().length < 4 || credential?.trim().length > 25)
   errs.push("Username needs to be between 4 and 25 characters");
  if (password?.trim().length < 6 || password?.trim().length > 25)
   errs.push("Password needs to be between 6 and 25 characters");

  if (showErr) {
   if (errs.length === 0) setDisabled(false);
   if (run === false) setRun(true);
   setErrors(errs);
  } else {
   if (errs.length === 0) setRun(true);
   else setRun(false);
  }
 }, [run, credential, password, showErr]);

 return (
  <div className="login-form-container">
   {console.log(
    "1st line after return LoginFormModal credential, password: ",
    credential,
    password
   )}
   <div>
    <h1>Log In</h1>
   </div>
   <form className="login-form" onSubmit={handleSubmit}>
    <div>
     <ul>
      {errors.map((error, idx) => (
       <li className="error-message" key={idx}>
        {error}
       </li>
      ))}
     </ul>
    </div>

    <label>
     Username or Email
     <input
      type="text"
      value={credential}
      onChange={(e) => setCredential(e.target.value)}
      required
     />
    </label>

    <label>
     Password
     <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
     />
    </label>

    <button
     disabled={disabled}
     className={
      !disabled
       ? "login-form-submit-button"
       : "login-form-submit-button disabled-button"
     }
     type="submit"
    >
     Log In
    </button>
   </form>
   <div className="login-demo-user" onClick={() => fillDemo1()}>
    Log in as Demo User1
   </div>
   {/* <div className="login-demo-user" onClick={() => fillDemo2()}>
        Log in as Demo User2
      </div>
      <div className="login-demo-user" onClick={() => fillDemo3()}>
        Log in as Demo User3
      </div> */}
  </div>
 );
}

export default LoginFormModal;
