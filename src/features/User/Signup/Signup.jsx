import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupNewUser } from "../authSlice";
import "./Signup.css";

export default function Signup() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(false);
  const { signupStatus } = useSelector((state) => state.auth);

  async function signupUser(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (email && password && username) {
      const { meta } = await dispatch(
        signupNewUser({ email, password, username })
      );
      if (meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } else {
      setSignupError(true);
    }
  }

  return (
    <div className="signup">
      <div className="signup-logo">
        <h1>Rambler</h1>
      </div>
      <div className="signup-form">
        <h2>Signup</h2>
        <form action="#" className="signup-form-content">
          {signupStatus === "error" && (
            <small style={{ color: "red" }}>email already present!</small>
          )}
          {signupError && (
            <small style={{ color: "red" }}>enter required fields</small>
          )}
          <div className="username">
            <label htmlFor="username">
              Username<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              ref={usernameRef}
              required
              maxLength={25}
              placeholder="max. 25 characters"
            />
          </div>
          <div className="email">
            <label htmlFor="email">
              Email<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              required
              placeholder="mail@website.com"
            />
          </div>
          <div className="password">
            <label htmlFor="password">
              Password<sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              required
              id="password"
              placeholder="min. 8 characters"
            />
          </div>
          <button className="signup-btn" onClick={(e) => signupUser(e)}>
            {signupStatus === "idle" ? (
              "Signup"
            ) : signupStatus === "error" ? (
              "Signup"
            ) : (
              <div className="signup-loader"></div>
            )}
          </button>
        </form>
        <p className="login-link">
          Already a member?{" "}
          <span onClick={() => navigate("/login", { replace: true })}>
            Login
          </span>{" "}
          !
        </p>
      </div>
    </div>
  );
}
