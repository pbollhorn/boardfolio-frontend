import { Link } from "react-router-dom";

export default function DummyFrontPage() {
  return (
    <div class="container">
      <h1>BoardFolio Dummy Frontpage</h1>
      <p>Links for the routes:</p>
      <div>
        <Link to="/">Frontpage</Link>
        <br />
        <Link to="/browse">Browse Games</Link>
        <br />
        <Link to="/search">Search Games</Link>
      </div>
    </div>
  );
}
