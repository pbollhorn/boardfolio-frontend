import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await facade.register(username, password);

      setSuccess("Registration successful! You can now log in.");
      // If you want to redirect right away:
      navigate("/");
    } catch (err) {
      console.error("Register failed:", err);

      let message = "Registration failed. Please try again.";

      // 🎯 Special case: username already exists (422 from your backend)
      if (err.status === 422) {
        message = "That username is already taken. Please choose another.";
      }
      // Optional: other status codes you might want to handle
      else if (err.status === 400) {
        message = "Invalid input. Please check your username and password.";
      }
      // If your ApiException sends a JSON body with a message
      else if (err.fullError && err.fullError.message) {
        message = err.fullError.message;
      }
      // Fallback to generic JS error message if present
      else if (err.message) {
        message = err.message;
      }

      setError(message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Register</h2>

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  id="bt-register"
                  className="btn btn-primary w-100"
                >
                  Register
                </button>
              </form>

              {success && (
                <div className="alert alert-success mt-3" role="alert">
                  {success}
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>

          <p className="text-muted text-center mt-3">
            Already have an account? <a href="/">Log in here</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
