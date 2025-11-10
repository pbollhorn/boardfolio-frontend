import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BrowseGames from "./components/BrowseGames.jsx";
import MyList from "./components/MyList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "home", //TODO: rename this if needed
        element: <App />, //TODO: create home component if needed, uses dummy component from App.jsx
      },
      {
        path: "browse", //TODO: rename this if needed
        element: <BrowseGames />,
      },
      {
        path: ":username/mylists", //TODO: rename this if needed
        element: <MyList />,
        children: [
          {
            path: ":listID", //TODO: rename this if needed
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
