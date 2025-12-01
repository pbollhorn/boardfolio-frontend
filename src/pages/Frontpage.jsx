import { Link } from "react-router-dom";

export default function Frontpage() {
  return (
    <div>
      <h2>Welcome to Boardfolio!</h2>
      <Link to="/login" className="btn btn-primary btn-sm">
        Go to Login
      </Link>
      <Link to="/register" className="btn btn-secondary btn-sm">
        Go to Register
      </Link>
    </div>
  );
}