import { Link } from "react-router-dom";

export default function FrontPage() {
  function toggleLightDarkMode() {
    alert("hello world");
    document.documentElement.setAttribute("data-bs-theme", "light");
  }

  return (
    <div class="container">
      <h1>BoardFolio Dummy Frontpage</h1>
      <p>Links to the routes:</p>
      <div>
        <Link to="/">Frontpage</Link>
        <br />
        <Link to="/browse">Browse Games</Link>
        <br />
        <Link to="/search">Search Games</Link>
      </div>
      <button onClick={toggleLightDarkMode}>Toggle light/dark mode</button>
    </div>
  );
}
