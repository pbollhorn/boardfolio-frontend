import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { isLoggedIn, username, login, logout } = useAuth();
  const [inputUser, setInputUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await login(inputUser, password);
      navigate("/");
    } catch (err) {
      setErrorMessage("Wrong username or password!");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <p className="mb-3">
            Logged in as{" "}
            <Link to={`/${username}/mylists`} className="fw-bold">
              {username}
            </Link>
          </p>
          <button className="btn btn-dark rounded-pill px-4" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-start min-vh-100 pt-5">
      <div style={{ maxWidth: "380px", width: "100%" }}>
        {/* Title */}
        <h1 className="text-center fw-semibold mb-4">Board game collector</h1>

        {/* Create account subtitle */}
        <h5 className="fw-semibold mb-1">Login with an account</h5>
        <p className="text-muted mb-3">Enter your username to Login for this app</p>

        {/* Error */}
        {errorMessage && (
          <div className="alert alert-danger py-2">{errorMessage}</div>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} className="mb-3">
          <input
            type="text"
            className="form-control mb-2 py-2"
            placeholder="Username"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 rounded-pill fw-semibold"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <div className="flex-grow-1 border-top"></div>
          <span className="mx-2 text-muted">or</span>
          <div className="flex-grow-1 border-top"></div>
        </div>

        <Link
  to="/register"
  className="btn btn-light w-100 py-2 mb-2 rounded-pill border d-flex justify-content-center align-items-center"
>
  <span className="me-2">👤</span>
  Continue to Register
</Link>

  

     
      </div>
    </div>
  );
}