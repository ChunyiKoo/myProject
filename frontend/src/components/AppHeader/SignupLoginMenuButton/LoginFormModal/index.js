// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
//import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const fillDemo1 = () => {
    setCredential("demo@user.io");
    setPassword("password");
  };

  const fillDemo2 = () => {
    setCredential("user1@user.io");
    setPassword("password1");
  };

  const fillDemo3 = () => {
    setCredential("user2@user.io");
    setPassword("password2");
  };

  return (
    <div className="login-form-container">
      <div>
        <h1>Log In</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
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
          disabled={credential.length < 4 || password.length < 6}
          className="login-form-submit-button"
          type="submit"
        >
          Log In
        </button>
      </form>
      <div className="login-demo-user" onClick={() => fillDemo1()}>
        Demo User1
      </div>
      <div className="login-demo-user" onClick={() => fillDemo2()}>
        Demo User2
      </div>
      <div className="login-demo-user" onClick={() => fillDemo3()}>
        Demo User3
      </div>
    </div>
  );
}

export default LoginFormModal;
