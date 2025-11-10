import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BrowseGames from "./components/BrowseGames.jsx";
import MyList from "./components/MyList.jsx";
import GameList from "./components/GameList.jsx";

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
        children: [
          {
            index: true, // matches "/:username/mylists" exactly
            element: <MyList />,
          },
          {
            path: ":listId", // matches "/:username/mylists/:listId"
            element: <GameList />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
