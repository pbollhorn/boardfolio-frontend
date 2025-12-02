import { Link } from "react-router-dom";
import ToggleThemeButton from "../components/ToggleThemeButton.jsx";

export default function FrontPage() {
  return (
    <div className="container">
      <h1>BoardFolio Dummy Frontpage</h1>
      <p>Links to the routes:</p>
      <div>
        <Link to="/">Frontpage</Link>
        <br />
        <Link to="/browse">Browse Games</Link>
        <br />
        <Link to="/search">Search Games</Link>
      </div>
      <br />
      <ToggleThemeButton />
    </div>
  );
}
