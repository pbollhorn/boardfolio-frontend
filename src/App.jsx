import { Outlet } from "react-router-dom";
// import BrowseGames from "./components/BrowseGames.jsx";
import "./App.css";

export default function App() {
  return (
    <>
      {/* <BrowseGames /> */}
      <Outlet />
    </>
  );
}
