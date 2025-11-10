import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to Boardfolio</h1>
      {/* The Outlet renders the child route (e.g., BrowseGames) */}
      <Outlet />
    </div>
  );
}

export default App;
