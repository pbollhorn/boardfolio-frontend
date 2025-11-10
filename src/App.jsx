import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to Boardfolio</h1>
      {/* TODO: This is just a dummy for the temp. home page */}
      <Outlet />
    </div>
  );
}

export default App;
