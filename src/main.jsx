import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Pages
import ErrorPage from "./pages/ErrorPage.jsx";
import FrontPage from "./pages/FrontPage.jsx";
import BrowseGames from "./pages/BrowseGames.jsx";
import SearchGames from "./pages/SearchGames.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <FrontPage />,
      },
      {
        path: "browse",
        element: <BrowseGames />,
      },
      {
        path: "search",
        element: <SearchGames />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
