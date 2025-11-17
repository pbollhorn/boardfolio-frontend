import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../util/apiFacade";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await facade.register(username, password);
      navigate(`/`); // TODO: change navigation to somewhere else if needed
      // Optionally, use a toast instead of alert:
      // setSuccess("Registration successful!")  // if you want a green bubble
      alert("Register successful, you can now login");
      setError("");
    } catch (err) {
      console.error("Register failed:", err);
      setError("Register failed: " + (err.message || "Invalid credentials"));
    }
  };

  return (
    <div>
      <h2>Register below!</h2>
      
      <form onSubmit={handleRegister}>
        <input
        //   className= TODO: Styling
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        //   className= TODO: Styling
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" id="bt-register" /* className= TODO: Styling */>
          Register
        </button>
      </form>
      {/* TODO: For developing, handle errors better than this! */}
      {error && <p
    //   className= TODO: Styling
      >{error}</p>}
    </div>
  );
}
