import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { isLoggedIn, username, login, logout } = useAuth();
  const [inputUser, setInputUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset before new attempt
    try {
      await login(inputUser, password);
    } catch (err) {
      console.log("Login failed: " + err);
      setErrorMessage("Wrong username or password!");
    }
  };

  return (
    <div>
        {/* TODO: handle errors better! */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {!isLoggedIn ? (
        // If not logged in show loginform
        <form onSubmit={handleLogin}>
          <input
            //   className= TODO: Styling
            type="text"
            placeholder="Username"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
          />
          <input
            //   className= TODO: Styling
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            //   className= TODO: Styling
            type="submit"
          >
            Login
          </button>
          <p
          //   className= TODO: Styling
          >
            {/* Links to registration page */}
            Don't have an account? <Link to="/register">Register here!</Link>
          </p>
        </form>
      ) : (
        // If logged in, hide loginform and show logout button
        <div>
          <p
          //   className= TODO: Styling
          >
            Logged in as{" "}
            <Link
              //TODO: change navigation if desired
              to={`/${username}/mylists`}
            >
              <strong>{username}</strong>
            </Link>
          </p>
          <button
            //   className= TODO: Styling
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
