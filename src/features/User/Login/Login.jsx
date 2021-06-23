import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithCredentials } from "../authSlice";
import "./Login.css";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginStatus } = useSelector((state) => state.auth);

  async function loginUser(e) {
    e.preventDefault();
    setLoginError(false);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) {
      const { meta } = await dispatch(
        loginWithCredentials({ email, password })
      );
      if (meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } else {
      setLoginError(true);
    }
  }

  return (
    <div className="login">
      <div className="login-logo">
        <h1>Rambler</h1>
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <form action="#" className="login-form-content">
          {loginStatus === "error" && (
            <small style={{ color: "red" }}>Invalid email/password</small>
          )}
          {loginError && (
            <small style={{ color: "red" }}>enter required fields</small>
          )}
          <div className="email">
            <label htmlFor="email">
              Email<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              placeholder="mail@website.com"
              required
            />
          </div>
          <div className="password">
            <label htmlFor="password">
              Password<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              required
              placeholder="min. 8 characters"
            />
          </div>
          <button className="login-btn" onClick={(e) => loginUser(e)}>
            {loginStatus === "idle" ? (
              "Login"
            ) : loginStatus === "error" ? (
              "Login"
            ) : (
              <div className="login-loader"></div>
            )}
          </button>
        </form>
        <p className="signup-link">
          New to Rambler?{" "}
          <span onClick={() => navigate("/signup", { replace: true })}>
            Signup
          </span>
          !
        </p>
      </div>
    </div>
  );
}
