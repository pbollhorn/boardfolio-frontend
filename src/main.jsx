import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BrowseGames from "./components/BrowseGames.jsx";
import MyList from "./components/MyList.jsx";
import GameList from "./components/GameList.jsx";
import CreateList from "./components/CreateList.jsx";

const router = createBrowserRouter([
  {
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        // element: <FrontPage />,
      },
      {
        path: "browse",
        element: <BrowseGames />,
      },
      {
        path: "search",
        // element: <SearchGames />,
      },
      {
        path: "/:username/mylists",
        element: <MyList />,
      },
      {
        path: "/:username/mylists/:listID",
        element: <GameList />,
      },
      {
        path: "/:username/mylists/newlist",
        element: <CreateList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
